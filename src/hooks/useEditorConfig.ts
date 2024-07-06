import type { EditorProps, OnChange, OnMount } from "@monaco-editor/react";
import type { editor } from "monaco-editor";
import { useMemo, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const SETTING_FILE_NAME = "settings.json";

const schema = z.object({
	"minimap.enabled": z.boolean().optional().default(true),
	fontSize: z.number().optional().default(12),
	fontWeight: z.string().optional().default("normal"),
	fontFamily: z.string().optional().default("monospace"),
});

export const useEditorConfig = (editorProps: EditorProps) => {
	const [opened, setOpened] = useState(false);
	const [rawSettings, setRawSettings] = useLocalStorage(
		"editor.settings",
		"{\n}",
	);
	const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

	const options = useMemo(():
		| editor.IStandaloneEditorConstructionOptions
		| undefined => {
		try {
			if (!rawSettings) {
				throw new Error("No settings");
			}

			const settings = schema.parse(JSON.parse(rawSettings));

			return {
				minimap: {
					enabled: settings["minimap.enabled"],
				},
				fontSize: settings.fontSize,
				fontWeight: settings.fontWeight,
				fontFamily: settings.fontFamily,
				...editorProps.options,
			};
		} catch (err) {
			return editorProps.options;
		}
	}, [editorProps.options, rawSettings]);

	const onMount: OnMount = (editor, monaco) => {
		editorRef.current = editor;

		monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
			schemas: [
				{
					uri: "settings.schema.json",
					fileMatch: [SETTING_FILE_NAME],
					schema: zodToJsonSchema(schema),
				},
			],
		});

		editorProps.onMount?.(editor, monaco);
	};

	const onChange: OnChange = (value) => {
		setRawSettings(value);
	};

	const props: EditorProps = opened
		? {
				...editorProps,
				path: SETTING_FILE_NAME,
				language: "json",
				defaultValue: rawSettings,
				options,
				onMount,
				onChange,
			}
		: {
				...editorProps,
				options,
				onMount,
			};

	const state = {
		opened,
		open() {
			setOpened(true);
		},
		close() {
			setOpened(false);
		},
		toggle() {
			setOpened((value) => !value);
		},
	};

	return [props, state] as const;
};

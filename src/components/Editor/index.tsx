import { clamp } from "@antfu/utils";
import {
	BarsArrowDownIcon,
	BarsArrowUpIcon,
	Cog6ToothIcon,
} from "@heroicons/react/16/solid";
import { type EditorProps, Editor as MonacoEditor } from "@monaco-editor/react";
import { useLocalStorage } from "react-use";
import { useEditorConfig } from "../../hooks/useEditorConfig";
import { EditorFooterButton } from "../EditorFooterButton";

type Props = EditorProps;

const DEFAULT_HEIGHT = 480;

export const Editor: React.FC<Props> = ({ ...props }) => {
	const [height, setHeight] = useLocalStorage("editor.height", DEFAULT_HEIGHT);

	const [editorProps, { opened, toggle }] = useEditorConfig(props);

	const changeHeight = (delta: number) => [
		setHeight((value = DEFAULT_HEIGHT) => clamp(value + delta, 120, 960)),
	];

	return (
		<div className="overflow-hidden rounded border">
			<MonacoEditor {...editorProps} height={height} />
			<div className="flex justify-between">
				<div className="grid grid-flow-col">
					<EditorFooterButton
						icon={BarsArrowDownIcon}
						onClick={() => changeHeight(120)}
					/>
					<EditorFooterButton
						icon={BarsArrowUpIcon}
						onClick={() => changeHeight(-120)}
					/>
				</div>
				<div className="grid grid-flow-col">
					<EditorFooterButton
						icon={Cog6ToothIcon}
						active={opened}
						onClick={() => toggle()}
					/>
				</div>
			</div>
		</div>
	);
};

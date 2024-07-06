import { clsx } from "clsx";

type Props = React.ComponentProps<"button"> & {
	active?: boolean;
	icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const EditorFooterButton: React.FC<Props> = ({
	icon: Icon,
	active,
	children,
	...props
}) => {
	return (
		<button
			className={clsx(
				"grid grid-flow-col place-items-center gap-1 px-2 py-1 text-xs hover:bg-slate-200",
				{
					"bg-slate-100": active,
				},
			)}
			{...props}
		>
			{Icon && <Icon className="size-4" />}
			{children}
		</button>
	);
};

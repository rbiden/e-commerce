export default function Textarea({ value, className = "", ...props }) {
	return (
		<div className="flex w-full">
			<textarea
            rows={'5'}
				value={value}
				className={`bg-primary py-3 px-4 rounded text-sm outline-0 border-2 border-primary focus:ring-2 focus:ring-white/15 w-full ${className}`}
				{...props}
			/>
		</div>
	);
}

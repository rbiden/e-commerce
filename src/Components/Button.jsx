export default function Button({ children, className = "", ...props }) {
	return (
		<div>
			<button
				{...props}
				className={`nav-link px-4 py-1 rounded font-semibold ${className}`}
			>
				{children}
			</button>
		</div>
	);
}

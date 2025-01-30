import { Link } from "react-router-dom";

export default function NavLink({ to, children, className = "" }) {
	return (
		<div>
			<Link
				to={to}
				className={`nav-link px-3 py-2 hover:text-white/70 text-white font-semibold ${className}`}
			>
				{children}
			</Link>
		</div>
	);
}
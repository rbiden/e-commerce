import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";

export default function Input({
	type = "text",
	value,
	className = "",
	...props
}) {
	const [showPassword, setShowPassword] = useState(false);
	const passwordRef = useRef(null);

	const handleTogglePassword = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
		passwordRef.current.type = !showPassword ? "text" : "password";
	};

	return (
		<div className='relative'>
			<input
				ref={passwordRef}
				type={type}
				value={value}
				className={`bg-primary py-2 px-4 rounded text-sm outline-0 border-2 border-primary focus:ring-2 focus:ring-white/15 w-full ${className}`}
				{...props}
			/>
			{type == "password" && (
				<button
					onClick={handleTogglePassword}
					className='absolute right-1 top-1/2 -translate-x-1/2 -translate-y-1/2'
				>
					{showPassword ? (
						<FontAwesomeIcon icon={faEye} />
					) : (
						<FontAwesomeIcon icon={faEyeSlash} />
					)}
				</button>
			)}
		</div>
	);
}

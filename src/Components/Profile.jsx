import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function ProfileButton() {
	const [clicked, setClicked] = useState(false);
	const { user } = useContext(UserContext);

	return (
		<div>
			{clicked && (
				<span className='fixed inset-0 bg-black/70 z-40'></span>
			)}
			<div className='relative z-50'>
				<button onClick={() => setClicked(!clicked)}>
					<FontAwesomeIcon
						className='text-2xl mt-1'
						icon={faCircleUser}
					/>
				</button>
				{clicked && <ProfileDropdown />}
			</div>
		</div>
	);
}

function ProfileDropdown() {
	const [logoutClicked, setLogoutClicked] = useState(false);

	return (
		<div className='absolute right-0 top-10 py-4 px-3 w-max rounded-xl bg-primary'>
			<h1 className='text-sm font-bold border-b border-white/30 pb-3 mb-2'>
				Profile
			</h1>
			<div>
				<DropdownItem>Edit Profile</DropdownItem>
				<DropdownItem onClick={() => setLogoutClicked(true)}>
					Logout
				</DropdownItem>
			</div>
			{logoutClicked && (
				<LogoutModal setLogoutClicked={setLogoutClicked} />
			)}
		</div>
	);
}

function DropdownItem({ href, onClick, children }) {
	return (
		<a
			href={href}
			onClick={onClick}
			className='block text-sm font-semibold hover:bg-white/5 w-full px-3 py-2 rounded text-start cursor-pointer'
		>
			{children}
		</a>
	);
}

function LogoutModal({ setLogoutClicked }) {
	const { logoutUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logoutUser();
		navigate("/")
	};

	const handleCancel = () => {
		setLogoutClicked(false);
	};

	return (
		<div className='absolute top-[9.5rem] right-0 p-4 bg-primary z-50 w-max rounded-lg'>
			<h1 className='text-white text-xs'>
				Are you sure you want to log out?
			</h1>
			<div className='flex items-center justify-end mt-2 gap-2'>
				<Button
					onClick={handleCancel}
					className='bg-red-500 text-2xs'
				>
					Cancel
				</Button>
				<Button
					onClick={handleLogout}
					className='bg-green-500 text-2xs'
				>
					Confirm
				</Button>
			</div>
		</div>
	);
}

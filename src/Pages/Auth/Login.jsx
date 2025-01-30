import Input from "../../Components/Input";
import Button from "../../Components/Button";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();
	const { refreshUser, setToken } = useContext(UserContext);
	const [errors, setErrors] = useState([]);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post("/api/login", form, {
				headers: {
					Accept: "application/json",
				},
			});

			setToken(response.data.token);
			localStorage.setItem("__token", response.data.token);
			toast.success("You have successfully signed in.");
			
			await refreshUser();
			navigate("/");
		} catch (error) {
			const errorMsgs = error.response.data.errors;

			if (errorMsgs?.all) {
				toast.error(errorMsgs.all);
				return;
			}

			setErrors(errorMsgs);
		}
	};

	return (
		<div className='w-3/5 mx-auto min-h-[70vh] flex flex-col items-center justify-center'>
			<main className='bg-white/5 mt-12 py-10 px-6 rounded-xl ring-2 ring-white/10'>
				<header className='mb-8 text-center'>
					<FontAwesomeIcon
						className='text-4xl mb-2'
						icon={faKey}
					/>
					<h1 className='font-bold text-2xl mb-1 text-center'>
						Login to your Account
					</h1>
					<p className='text-sm text-center'>
						Don&apos;t have an account?{" "}
						<Link
							className='font-semibold'
							to='/register'
						>
							Register
						</Link>
					</p>
				</header>
				{/* Login Form */}
				<form
					onSubmit={handleSubmit}
					className='space-y-4 mb-3 w-full'
				>
					<fieldset className='space-y-1'>
						<Input
							type='email'
							name='email'
							value={form.email}
							onChange={handleChange}
							placeholder='Email'
						/>
						{errors?.email && (
							<p className='text-red-500 text-xs'>
								{errors.errors.email}
							</p>
						)}
					</fieldset>
					<fieldset className='space-y-1'>
						<Input
							type='password'
							name='password'
							value={form.password}
							onChange={handleChange}
							placeholder='Password'
						/>
						{errors?.password && (
							<p className='text-red-500 text-xs'>
								{errors.errors.password}
							</p>
						)}
					</fieldset>
					<Button
						className='bg-white text-black hover:bg-white/80 text-sm w-full py-2'
						type='submit'
					>
						Login
					</Button>
				</form>
			</main>
		</div>
	);
}

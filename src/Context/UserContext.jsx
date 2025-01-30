import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loading from "../Components/Loading";
import axios from "axios";

export const UserContext = createContext();

export default function UserProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("__token"));
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(false);

	async function getUser() {
		console.log("Fetch user...");
		try {
			setLoading(true);
			const res = await axios.get("/api/user", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			setUser(res.data);
		} catch (error) {
			const errorMsgs = error.response.data;
			toast.error(errorMsgs.message);
		} finally {
			setLoading(false);
		}
	}

	async function logoutUser() {
		try {
		 	await axios.post(
				"/api/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setToken(null);
			setUser(null);

			localStorage.removeItem("__token");
			toast.success("Logged out successfully");
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	}

	async function refreshUser() {
		console.log("Refresh user...");
		await getUser();
	}

	useEffect(() => {
		if (token) {
			
			getUser();
		}
	}, [token]);

	if (loading) return <Loading />;

	return (
		<UserContext.Provider
			value={{ token, setToken, user, setUser, logoutUser, loading, refreshUser }}
		>
			{children}
		</UserContext.Provider>
	);
}

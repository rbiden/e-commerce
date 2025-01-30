import {
	BrowserRouter,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";

import "./App.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/User/Home";
import Product from "./Pages/User/Product";
import Login from "./Pages/Auth/Login";
import SellerHome from "./Pages/Seller/Home";

export default function App() {
	const { user } = useContext(UserContext);

	const homepage = () => {
		if (user && user.user_type === "seller") return <SellerHome />;
		return <Home />;
	};

	const product = () => {
		if (user && user.user_type === "seller") return "Product for Seller";
		return <Product />;
	};

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Layout />}
				>
					<Route
						index
						element={homepage()}
					/>
					<Route
						path='/login'
						element={user?.id ? <Navigate to='/' /> : <Login />}
					/>
					<Route
						path='/product/:id'
						element={product()}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

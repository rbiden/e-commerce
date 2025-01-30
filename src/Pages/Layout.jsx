import NavLink from "../Components/NavLink";
import Input from "../Components/Input";
import Profile from "../Components/Profile";
import Product from "../Components/Product";
import LazyLoading from "./User/LazyLoading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBagShopping,
	faBoxOpen,
	faDolly,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
// import { faReact } from "@fortawesome/free-brands-svg-icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { searchProduct } from "../Controllers/ProductController";

export default function Layout() {
	const { user } = useContext(UserContext);
	const path = useLocation().pathname.replace("/", "");
	const [query, setQuery] = useState("");
	const [loading, setLoading] = useState(false);
	const [queryResults, setQueryResults] = useState([]);

	return (
		<div>
			<nav className='flex items-start py-4 px-6 justify-between border-b-2 border-white/10'>
				<h1 className='flex-1 text-3xl font-heading'>LeapCart</h1>
				<div className='flex-1 space-y-2'>
					<SearchComponent
						setQuery={setQuery}
						setLoading={setLoading}
						query={query}
						setQueryResults={setQueryResults}
					/>
					<ul className='flex justify-center'>
						<li>
							<NavLink
								className='text-xs lg:text-sm'
								to='/'
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								className='text-xs lg:text-sm'
								to='/about'
							>
								About
							</NavLink>
						</li>
						<li>
							<NavLink
								className='text-xs lg:text-sm'
								to='/contact'
							>
								Contact
							</NavLink>
						</li>
					</ul>
				</div>
				<div className='flex-1 flex items-center justify-end gap-4 pt-1'>
					{user?.id ? (
						user.user_type === "seller" ? (
							<>
								<a
									className='flex'
									href='#'
								>
									<FontAwesomeIcon
										className='text-xl hover:text-white/80'
										icon={faBoxOpen}
									/>
								</a>
								<a
									className='flex'
									href='#'
								>
									<FontAwesomeIcon
										className='text-xl hover:text-white/80'
										icon={faDolly}
									/>
								</a>
							</>
						) : (
							<>
								<a
									className='flex'
									href='#'
								>
									<FontAwesomeIcon
										className='text-xl hover:text-white/80'
										icon={faBagShopping}
									/>
								</a>
								<a
									className='flex'
									href='#'
								>
									<FontAwesomeIcon
										className='text-xl hover:text-white/80'
										icon={faHeart}
									/>
								</a>
							</>
						)
					) : (
						""
					)}
					{path !== "login" ? (
						!user?.id ? (
							<Link
								to='/login'
								className='bg-white hover:bg-white/80 text-black text-xs font-semibold px-3 py-1 rounded'
							>
								Login
							</Link>
						) : (
							<Profile />
						)
					) : (
						""
					)}
				</div>
			</nav>

			<main className='min-h-[80vh] py-6 px-12 mx-auto lg:w-3/4'>
				<ToastContainer
					theme='colored'
					autoClose={3000}
					position='bottom-right'
					style={{
						fontSize: "13px",
					}}
				/>
				{loading && query ? (
					<LazyLoading />
				) : queryResults && query ? (
					<QueryResults
						results={queryResults}
						query={query}
					/>
				) : (
					<Outlet />
				)}
			</main>
			{/* <footer className='text-white text-xs flex items-center justify-center mb-2 gap-2 ml-12'>
				Powered by React JS
				<FontAwesomeIcon
					className='text-2xl text-cyan-600'
					icon={faReact}
				/>
			</footer> */}
		</div>
	);
}

function QueryResults({ results, query }) {
	console.log(results);

	if (results.length == 0)
		return (
			<h1>
				No results for <strong>{query}</strong>
			</h1>
		);

	return (
		<div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-6 lg:flex-none'>
			{results.map((product, index) => (
				<Product
					key={index}
					product={product}
					className={""}
				/>
			))}
		</div>
	);
}

function SearchComponent({ setQuery, setLoading, query, setQueryResults }) {
	const [debouncedQuery, setDebouncedQuery] = useState(query);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 700);

		return () => {
			clearTimeout(handler);
		};
	}, [query]);

	useEffect(() => {
		if (debouncedQuery && debouncedQuery.length > 2) {
			setLoading(true);

			const search = async () => {
				try {
					const res = await searchProduct(query);
					setQueryResults(res.data);
				} catch (err) {
					console.error(err);
					toast.error("Error searching for products");
				} finally {
					setLoading(false);
				}
			};

			search();
		}
	}, [debouncedQuery]);

	const handleSearch = (e) => {
		if (e.key === "search" || e.key === "Enter") {
			setQuery(e.target.value);
		} else if (e.key === "Escape") {
			setQuery("");
			setQueryResults([]);
		}
	};

	return (
		<span className='relative'>
			<Input
				placeholder='Phone Holder'
				onKeyUp={handleSearch}
				onChange={(e) => setQuery(e.target.value)}
				className='py-1 px-3 text-xs'
				value={query}
			/>
			<h1 className='absolute text-2xs text-gray-400 right-1 top-1/2 -translate-x-1/2 -translate-y-1/2'>
				{query ? "Esc" : "Enter"}
			</h1>
		</span>
	);
}

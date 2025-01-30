import axios from "axios";
import Product from "../../Components/Product";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getAllProducts } from "../../Controllers/ProductController";
import Loading from "../../Components/Loading";

export default function SellerHome() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState(null);

	useEffect(() => {
		const getAllCategories = async () => {
			try {
				const res = await axios.get("/api/category");
				setCategory(res.data);
			} catch (err) {
				console.error(err);
				toast.error("Error fetching products");
			} finally {
				setLoading(false);
			}
		};

		async function getProducts() {
			const products = await getAllProducts();
			setProducts(products);
		}

		getAllCategories();
		getProducts();
	}, []);

	return (
		<div className='w-full'>
			<h1 className='mb-4'>Seller Home Page</h1>
			<section className='mb-8 w-full'>
				<div className='whitespace-nowrap flex gap-3 overflow-x-scroll hide-scrollbar'>
					{category &&
						products.map((item) => {
							return (
								<a
									href='#'
									key={item.id}
									className='text-xs hover:bg-white/20 bg-white/10 py-2 px-4 rounded-full text-white'
								>
									{item.title}
								</a>
							);
						})}
				</div>
			</section>

			<section>
				<h1 className='font-bold text-xl'>Popular Products</h1>
				<main className='overflow-x-scroll hide-scrollbar gap-6 flex p-4 scr'>
					{products.slice(0, 5).map((product, index) => (
						<Product
							key={index}
							product={product}
						/>
					))}
				</main>
			</section>
		</div>
	);
}

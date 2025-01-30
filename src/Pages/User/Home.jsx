import axios from "axios";
import Product from "../../Components/Product";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../../Controllers/ProductController";
import LazyLoading from "./LazyLoading";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home() {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const [category, setCategory] = useState(null);
	const [nextPage, setNextPage] = useState(null);

	async function getProducts(url = "/api/products") {
		const res = await getAllProducts(url);
		if (products) {
			setProducts([...products, ...res.data]);
		} else {
			setProducts(res.data);
		}

		setNextPage(res.next_page_url);
	}

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

		getAllCategories();
		getProducts();
	}, []);

	const loadMore = () => {
		if (!nextPage) return;
		getProducts(nextPage);
	};

	if (loading) return <LazyLoading />;

	return (
		<div className='w-full'>
			<section className='mb-4 w-full'>
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

			<section className='mb-6 border-t border-white/30 pt-4'>
				<h1 className='font-bold text-xl'>Popular Products</h1>
				<main className='relative overflow-x-scroll hide-scrollbar gap-6 flex p-4 scr'>
					{products.slice(0, 5).map((product, index) => (
						<Product
							key={product.id}
							product={product}
						/>
					))}
				</main>
			</section>

			<section className='border-t border-white/30 pt-4'>
				<h1 className='font-bold text-xl flex items-center gap-2 mb-6'>
					Enjoy Unlimited Free Shipping Voucher Everyday!
				</h1>
				<InfiniteScroll
					dataLength={products.length} // Length of the loaded items
					next={() => getProducts(nextPage)} // Fetch next batch
					hasMore={!!nextPage} // Check if there's more to load
					loader={<h1 className="mt-6 text-center text-xs">Loading...</h1>} // Loader at the bottom
					endMessage={<h1 className="mt-6 text-center text-xs">No more products to load.</h1>} // Message when done
				>
					<div className='flex flex-wrap justify-center gap-x-4 gap-y-6'>
						{products.slice(5).map((product) => (
							<Product
								key={product.id}
								product={product}
							/>
						))}
					</div>
				</InfiniteScroll>
				{/* {!loading && nextPage && (
					<button
						onClick={loadMore}
						className='flex mx-auto mt-4 text-xs'
					>
						Load More
					</button>
				)} */}
			</section>
		</div>
	);
}

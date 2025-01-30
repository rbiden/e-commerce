import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faStar,
	faBagShopping,
	faStore,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Button from "./Button";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Product({ product, className }) {
	const [itemId, setItemId] = useState(null);

	return (
		<div className={`rounded-lg w-44 min-h-64 flex-shrink-0 lg:flex-1 flex flex-col ${className}`}>
			<Link to={`/product/${product.id}`}>
				<span className='mb-2 relative bg-primary p-3 flex items-center justify-center h-44 w-full rounded-xl'>
					<span className='text-white bg-black/90 px-2 py-1 rounded-full absolute font-semibold text-[.55rem] right-2 top-2'>
						{product.category_name}
					</span>
					<img
						src={product.image_url}
						className='h-full w-full object-contain'
						alt='image url'
					/>
				</span>

				<h1 className='font-bold leading-5 text-sm mb-2 truncate'>
					{product.title}
				</h1>
			</Link>
			
			<div className='flex items-center justify-between mt-auto mb-3'>
				<span className=' text-2xs flex items-center'>
					<FontAwesomeIcon
						className='text-yellow-500'
						icon={faStar}
					/>
					<p className='text-white/50 font-semibold ml-1 mr-[.1rem]'>
						{product.rating}
					</p>
					<p className='text-white/50 font-semibold '>
						({product.votes})
					</p>
				</span>
				<p className='text-sm font-semibold'>${product.price}</p>
			</div>

			<div className='flex items-center gap-3'>
				<button>
					<FontAwesomeIcon
						className='text-lg hover:text-white/80'
						icon={faBagShopping}
					/>
				</button>
				<button className='mr-auto'>
					<FontAwesomeIcon
						className='text-lg hover:text-white/80'
						icon={faHeart}
					/>
				</button>
				<Button
					onClick={() => setItemId(product.id)}
					className='text-2xs py-[.4rem] px-3 bg-white rounded-s-2xl text-black font-bold flex items-center gap-1 group w-12 hover:w-24 transition-all duration-300 relative overflow-hidden'
				>
					<span className='absolute translate-x-44 group-hover:translate-x-5 transition-all duration-300'>
						Buy Now
					</span>
					<FontAwesomeIcon icon={faStore} />
				</Button>
			</div>
		</div>
	);
}

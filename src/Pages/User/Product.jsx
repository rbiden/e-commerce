import { useParams } from "react-router-dom";
import { getProduct } from "../../Controllers/ProductController";
import { useEffect, useState } from "react";

export default function Product() {
	const { id } = useParams();
	const [productInfo, setProductInfo] = useState({});

	console.log(productInfo)

	useEffect(() => {
		async function productInfo() {
			const res = await getProduct(id);
			setProductInfo(res);
		}
		productInfo();
	}, []);

	return <h1>Hello World</h1>;
}

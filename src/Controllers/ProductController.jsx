import axios from "axios";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

// Helper function to handle API requests
const apiRequest = async (method, url, data = null) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		let response;
		if (method === "get") {
			response = await axios.get(url, config);
		} else if (method === "delete") {
			response = await axios.delete(url, config);
		} else if (method === "product") {
			response = await axios.product(url, data, config);
		} else if (method === "put") {
			response = await axios.put(url, data, config);
		} else {
			throw new Error({ all: "Unsupported method" });
		}

		return response.data;
	} catch (error) {
		const errorMsgs = error.response.data.errors;
		if (error.response && error.response.status === 429) {
			toast.error("Too many attempts. Please try again later.");
		} else if (errorMsgs && errorMsgs.all) {
			toast.error(errorMsgs.all);
		} else {
			toast.error("There was an error with your request. Try again.");
		}

		throw error.response ? errorMsgs : error;
	}
};

const getAllProducts = (url) => apiRequest("get", url);

const createProduct = (formData) =>
	apiRequest("product", "/api/products", formData);

const getProduct = (id) => apiRequest("get", `/api/products/${id}`);

const updateProduct = (formData) =>
	apiRequest("put", `/api/products/${formData.id}`, formData);

const deleteProduct = (id) => apiRequest("delete", `/api/products/${id}`);

const searchProduct = (query) => apiRequest("get", `/api/search?q=${query}`);

export {
	getAllProducts,
	createProduct,
	getProduct,
	updateProduct,
	deleteProduct,
	searchProduct,
};

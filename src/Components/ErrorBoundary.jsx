import React from "react";
import Home from "../Pages/Posts/Home";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			errorMessage: "",
		};
	}

	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			errorMessage: error.message || "An unexpected error occurred",
		};
	}

	render() {
		if (this.state.hasError) {
			return <Home />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

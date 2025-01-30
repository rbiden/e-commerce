export default function Loading() {
	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex gap-6'>
				<div className='rounded-full bg-white h-4 w-4 animate-ping'></div>
				<div
					className='rounded-full bg-white h-4 w-4 animate-ping'
					style={{ animationDelay: "0.3s" }}
				></div>
				<div
					className='rounded-full bg-white h-4 w-4 animate-ping'
					style={{ animationDelay: "0.6s" }}
				></div>
			</div>
		</div>
	);
}

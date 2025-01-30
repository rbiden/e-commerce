export default function LazyLoading() {
	return (
		<div className='space-y-6'>
			<div className='flex gap-4'>
				<LoadingTag />
				<LoadingTag />
				<LoadingTag />
				<LoadingTag />
			</div>
			<div>
				<h1 className='font-bold text-xl mb-4'>Popular Products</h1>
				<div className='flex items-center gap-5 ms-4'>
					<LoadingCard />
					<LoadingCard />
					<LoadingCard />
					<LoadingCard />
					<LoadingCard className='max-lg:hidden' />
				</div>
			</div>
		</div>
	);
}

function LoadingTag() {
	return <div className='w-20 h-6 bg-primary animate-pulse rounded-lg' />;
}

function LoadingCard({ className }) {
	return (
		<div className={"flex-1 flex flex-col w-54 gap-2 " + className}>
			<div className='w-full h-36 bg-primary animate-pulse rounded-lg' />
			<div className='w-full h-2 bg-primary animate-pulse rounded-lg' />
			<div className='w-3/4 h-2 bg-primary animate-pulse rounded-lg' />
			<div className='flex justify-between gap-2 mt-2'>
				<div className='w-1/2 h-4 bg-primary animate-pulse rounded-md' />
				<div className='w-1/3 h-4 bg-primary animate-pulse rounded-md' />
			</div>
		</div>
	);
}

interface NotFoundPageProps {
	title: string
	description: string
}

export default function NotFoundPage({ title, description }: NotFoundPageProps) {
	return (
		<section className='flex flex-1 items-center justify-center px-6 py-24'>
			<div className='w-full max-w-xl rounded-3xl border border-black/5 px-8 py-12 text-center shadow-[0_25px_120px_rgba(15,15,15,0.08)] space-y-6'>
				<p className='text-xs uppercase tracking-[0.4em] text-black/50'>
					{title}
				</p>
				<h1 className='text-5xl font-semibold sm:text-6xl text-black'>
					404
				</h1>
				<p className='text-base text-black/70 leading-relaxed'>
					{description}
				</p>
			</div>
		</section>
	)
}


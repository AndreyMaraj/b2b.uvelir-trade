import Link from '@/components/link'

export default function Footer() {
	return (
		<footer className='bg-black py-10'>
			<div className='container text-white flex flex-col md:flex-row justify-between gap-8 px-3'>
				<div className='mt-8 text-sm'>
					<p>
						© 2024, UvelirTrade
					</p>
					<Link href='/privacy-policy'>
						Политика конфиденциальности
					</Link>
				</div>
				<div>
					<h3 className='text-lg font-semibold mb-4'>
						Партнёрам
					</h3>
					<ul className='space-y-2'>
						<li>
							<Link href='/catalog'>
								Каталог
							</Link>
						</li>
						<li>
							<Link href='/auth/login'>
								Вход для партнёров
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 className='text-lg font-semibold mb-4'>
						Контакты
					</h3>
					<ul className='space-y-2'>
						<li>
							Индустриальная 50/2
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
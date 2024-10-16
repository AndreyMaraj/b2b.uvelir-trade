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
							<Link href='#'>
								Коммерческое предложение
							</Link>
						</li>
						<li>
							<Link href='#'>
								Условия работы
							</Link>
						</li>
						<li>
							<Link href='/catalog'>
								Каталог
							</Link>
						</li>
						<li>
							<Link href='#'>
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
						<li>
							<Link href='tel:89999999999' isExternal>
								8 (999) 999-99-99
							</Link>
						</li>
						<li>
							<Link href='mailto:info@uvelirtrade.ru' isExternal>
								info@uvelirtrade.ru
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}
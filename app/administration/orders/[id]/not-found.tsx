import NotFoundPage from '@/components/not-found-page'

export default function NotFound() {
	return (
		<NotFoundPage
			title='Заказ не найден'
			description='Мы не нашли заказ с таким номером в панели администратора. Проверьте ссылку или вернитесь к списку.'
		/>
	)
}
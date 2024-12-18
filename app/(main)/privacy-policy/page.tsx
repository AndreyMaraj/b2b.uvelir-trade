import { openGraph, twitter } from '@/app/shared-metadata'
import type { Metadata } from 'next/types'

const title = 'Политика конфиденциальности',
	description = 'Узнайте о нашей политике конфиденциальности и защите ваших данных.',
	url = '/privacy-policy'

export const metadata: Metadata = {
	title,
	description,
	alternates: {
		canonical: url
	},
	openGraph: {
		...openGraph,
		url,
		title,
		description
	},
	twitter: {
		...twitter,
		description,
		title
	}
}

export default function Page() {
	return (
		<>
			<h1 className='text-3xl mb-5'>
				Политика конфиденциальности
			</h1>
			<div>
				<p>Настоящая Политика конфиденциальности регулирует порядок обработки и использования персональных данных физических лиц, пользующихся сервисами Сайта www.b2b.uvelir-trade.ru ООО «Ювелир Трейд» (далее — Оператор).</p>
				<p>Передавая Оператору персональные данные посредством использования Сайта и регистрации на Сайте, Пользователь дает свое согласие (добровольное и бессрочное) на использование персональных данных на условиях, изложенных в настоящей Политике конфиденциальности. Пользователь дает согласие на обработку персональных данных свободно, своей волей и в своем интересе. Согласие не является письменным, так как Оператор не обрабатывает специальные и биометрические персональные данные. Согласие дается в соответствии с п. 1 ст. 9 Федерального закона от 27.07.2006 N 152-ФЗ (ред. от 22.02.2017) &apos;О персональных данных&apos;.</p>
				<p>Если Пользователь не согласен с условиями настоящей Политики конфиденциальности, он обязан прекратить использование Сайта.</p>
				<p>Безусловным акцептом настоящей Политики конфиденциальности является начало использования Сайта Пользователем.</p>
				<p>Оператор может обновлять Политику по мере необходимости. Рекомендуем Пользователям периодически проверять актуальность данной Политики. Продолжая пользоваться Сайтом после изменения Политики, Пользователь подтверждает согласие с внесенными изменениями.</p>
				<p>&nbsp;</p>
				<p><span className='text-xl'>1. Термины</span></p>
				<p>1.1. Сайт – сайт, расположенный в сети Интернет по адресу www.b2b.uvelir-trade.ru. Все исключительные права на Сайт и его отдельные элементы (включая программное обеспечение, дизайн) принадлежат Оператору в полном объеме.</p>
				<p>1.2. Пользователь – лицо, использующее Сайт.</p>
				<p>1.3. Персональные данные – персональные данные Пользователя, которые Пользователь предоставляет о себе самостоятельно при Регистрации или в процессе использования Сайта.</p>
				<p>1.4. Обработка персональных данных – любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.</p>
				<p>1.5. Конфиденциальность персональных данных – обязательное для соблюдения Оператором или иным получившим доступ к персональным данным лицом требование не допускать их распространения без согласия субъекта персональных данных или наличия иного законного основания.</p>
				<p>1.6. Регистрация – заполнение Пользователем Регистрационной формы, расположенной на Сайте, путем указания необходимых сведений и выбора логина и пароля для доступа к Сайту.</p>
				<p>&nbsp;</p>
				<p><span className='text-xl'>2. Состав информации о Пользователях</span></p>
				<p>2.1. Оператор обрабатывает следующие персональные данные:</p>
				<ul>
					<li>Имя Пользователя</li>
					<li>Адрес электронной почты</li>
					<li>Номер телефона</li>
				</ul>
				<p>2.2. Обработка указанных выше персональных данных осуществляется Оператором для выполнения своих обязательств перед Пользователем и анализа работы сайта. Персональные данные Оператором не распространяются и не передаются третьим лицам.</p>
				<p>2.3. Для получения интернет-рассылки о рекламных акциях и получения рекламно-информационных материалов (направляются Пользователям для того, чтобы можно было сориентироваться и сделать правильный выбор товара) необходимо указать только имя Пользователя и Адрес электронной почты. Пользователь может в любой момент отказаться от рассылки путем направления Оператору отказа от рассылки по электронному адресу: info@b2b.uvelir-trade.ru или нажатием кнопки «Отказаться от рассылки» в теле письма рассылки.&nbsp;<br /></p>
				<p>&nbsp;</p>
				<p><span className='text-xl'>3. Порядок обработки персональных данных</span></p>
				<p>3.1. Оператор обязуется использовать Персональные данные в соответствии с Федеральным Законом «О персональных данных» № 152-ФЗ от 27 июля 2006 г. и настоящей политикой конфиденциальности.</p>
				<p>3.2. В отношении персональных данных Пользователя сохраняется их конфиденциальность, кроме случаев, когда указанные данные являются общедоступными.</p>
				<p>3.3. Оператор имеет право хранить персональные данные только на серверах на территории Российской Федерации.</p>
				<p>3.4. Оператор имеет право передавать персональные данные Пользователя без согласия Пользователя следующим лицам:</p>
				<p>3.4.1 государственным органам, в том числе органам дознания и следствия, и органам местного самоуправления по их мотивированному запросу;</p>
				<p>3.4.2 в иных случаях, прямо предусмотренных действующим законодательством РФ.</p>
				<p>3.5. Оператор имеет право передавать персональные данные третьим лицам, не указанным в п. 3.4. настоящей Политики конфиденциальности, в следующих случаях:</p>
				<p>3.5.1 Пользователь выразил свое согласие на такие действия;</p>
				<p>3.5.2 передача необходима в рамках использования Пользователем Сайта.</p>
				<p>3.6 Оператор осуществляет автоматизированную обработку персональных данных.</p>
				<p>&nbsp;</p>
				<p><span className='text-xl'>4. Права и обязанности Пользователя</span></p>
				<p>4.1. Пользователь обязуется не сообщать третьим лицам логин и пароль, используемые им для идентификации на Сайте.</p>
				<p>4.2. Пользователь обязуется соблюдать должную осмотрительность при хранении пароля, при его вводе.</p>
				<p>4.3. Пользователь обязуется при регистрации на Сайте использовать сложные сочетания символов для создания логина/пароля.</p>
				<p>4.4. Пользователь обязуется не предоставлять третьим лицам в пользование компьютерное устройство в случае, если с него возможен свободный доступ к личному кабинету Пользователя.</p>
				<p>4.5. Пользователь гарантирует, что все персональные данные являются актуальными и не относятся к третьим лицам.</p>
				<p>4.6. Пользователь вправе изменять, удалять и редактировать свои персональные данные.</p>
				<p>&nbsp;</p>
				<p><span className='text-xl'>5. Защита персональных данных</span></p>
				<p>5.1. Оператор осуществляет надлежащую защиту персональных данных в соответствии с законодательством РФ и принимает необходимые и достаточные организационные и технические меры для защиты персональных данных.</p>
				<p>5.2. Для обеспечения безопасности персональных данных при их обработке Оператор принимает меры для защиты персональных данных от неправомерного или случайного доступа к ним, их уничтожения, изменения, блокирования, копирования, предоставления, распространения, а также от иных неправомерных действий в отношении персональных данных.</p>
				<p>5.3. В целях обеспечения информационной безопасности Оператором предпринимаются следующие меры для защиты персональной информации:</p>
				<p>— обязательное использование брандмауэров, антивирусных систем;</p>
				<p>— резервное копирование данных;</p>
				<p>— использование стандартных отраслевых мер безопасности.</p>
				<p>Персональная информация хранится на сервере компании и может быть использована для последующего информирования клиентов о новых акциях и услугах, а также для проведения маркетинговых, статистических и иных исследований.</p>
				<p>&nbsp;</p>
				<p><span className='text-xl'>6. Иные положения</span></p>
				<p>6.1. К настоящей Политике конфиденциальности и отношениям между Пользователем и Оператором, возникающим в связи с применением Политики конфиденциальности, подлежит применению право Российской Федерации.</p>
				<p>6.2. Все возможные споры, вытекающие из настоящего соглашения, подлежат разрешению в соответствии с действующим законодательством.</p>
				<p>Перед обращением в суд Пользователь должен соблюсти обязательный досудебный порядок и направить Оператору соответствующую претензию в письменном виде. Срок ответа на претензию составляет 30 (тридцать) рабочих дней.</p>
				<p>6.3. Если по тем или иным причинам одно или несколько положений Политики конфиденциальности будут признаны недействительными или не имеющими юридической силы, это не оказывает влияния на действительность или применимость остальных положений Политики конфиденциальности.</p>
				<p>6.4. Оператор имеет право в любой момент изменять Политику конфиденциальности (полностью или в части) в одностороннем порядке без предварительного согласования с Пользователем. Все изменения вступают в силу на следующий день после размещения на Сайте.</p>
				<p>6.5. Пользователь обязуется самостоятельно следить за изменениями Политики конфиденциальности путем ознакомления с актуальной редакцией.</p>
				<p>&nbsp;</p>
				<p><span className='text-xl'>7. Контактная информация Оператора</span></p>
				<p>7.1. ООО «Ювелир Трейд»</p>
				<p>(ИНН 5504140694)</p>
				<p>7.2. Телефон: </p>
				<p>7.3. E-mail: </p>
				<p>7.4. Адрес для направления обращений клиентов по вопросам исполнения услуг, пользования сервисом, пожеланий и предложений, направленных по адресу: 156019, г. Кострома, ул. Индустриальная, д. 50/2</p>
			</div>
		</>
	)
}
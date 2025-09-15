import { z } from 'zod'

export const LoginSchema = z.object({
	email: z.email('Email обязателен'),
	password: z.string().min(1, {
		error: 'Пароль обязателен'
	})
})

export const ManagerRegisterSchema = z.object({
	surname: z.string().min(1, {
		error: 'Фамилия обязательна'
	}),
	name: z.string().min(1, {
		error: 'Имя обязательно'
	}),
	patronymic: z.string().min(1, {
		error: 'Отчетсво обязательно'
	}),
	email: z.email('Email обязателен'),
	phone: z.string().min(1, {
		error: 'Телефон обязателен'
	}),
	password: z.string().min(6, {
		error: 'Минимум 6 символов необходимо'
	}),
	confirmPassword: z.string().min(6, {
		error: 'Минимум 6 символов необходимо'
	})
})

export const ClientRegisterSchema = z.object({
	email: z.email('Email обязателен'),
	phone: z.string().min(1, {
		error: 'Телефон обязателен'
	}),
	password: z.string().min(6, {
		error: 'Минимум 6 символов необходимо'
	}),
	confirmPassword: z.string().min(6, {
		error: 'Минимум 6 символов необходимо'
	}),
	organization: z.string().min(1, {
		error: 'Название компании обязательно'
	}),
	tin: z.string().min(1, {
		error: 'ИНН обязателен'
	}),
	city: z.string().min(1, {
		error: 'Город обязателен'
	}),
	managerId: z.string('Выберите менеджера')
})

export const AdminProfileSchema = z.object({
	phone: z.string().min(1, {
		error: 'Телефон обязателен'
	}),
	email: z.email('Email обязателен')
})

export const ManagerProfileSchema = z.object({
	surname: z.string().min(1, {
		error: 'Фамилия обязательна'
	}),
	name: z.string().min(1, {
		error: 'Имя обязательно'
	}),
	patronymic: z.string().min(1, {
		error: 'Отчетсво обязательно'
	}),
	phone: z.string().min(1, {
		error: 'Телефон обязателен'
	}),
	email: z.email('Email обязателен')
})

export const ClientProfileSchema = z.object({
	organization: z.string().min(1, {
		error: 'Название компании обязательно'
	}),
	phone: z.string().min(1, {
		error: 'Телефон обязателен'
	}),
	email: z.email('Email обязателен'),
	tin: z.string().min(1, {
		error: 'ИНН обязателен'
	}),
	city: z.string().min(1, {
		error: 'Город обязателен'
	})
})
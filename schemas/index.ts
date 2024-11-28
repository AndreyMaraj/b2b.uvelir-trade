import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email('Email обязателен'),
	password: z.string().min(1, {
		message: 'Пароль обязателен'
	})
})

export const RegisterSchema = z.object({
	email: z.string().email('Email обязателен'),
	phone: z.string().min(1, {
		message: 'Телефон обязателен'
	}),
	password: z.string().min(6, {
		message: 'Минимум 6 символов необходимо'
	}),
	confirmPassword: z.string().min(6, {
		message: 'Минимум 6 символов необходимо'
	}),
	name: z.string().min(1, {
		message: 'Название компании обязательно'
	}),
	tin: z.string().min(1, {
		message: 'ИНН обязательно'
	}),
	city: z.string().min(1, {
		message: 'Город обязателен'
	})
})

export const ProfileSchema = z.object({
	name: z.string().min(1, {
		message: 'Название компании обязательно'
	}),
	phone: z.string().min(1, {
		message: 'Телефон обязателен'
	}),
	email: z.string().email('Email обязателен'),
	tin: z.string().min(1, {
		message: 'ИНН обязательно'
	}),
	city: z.string().min(1, {
		message: 'Город обязателен'
	})
})
import { ZodSchema, ZodError } from 'zod';
import * as z from 'zod';

type ValidationResult<T> =
	| {
			success: false;
			data: null;
			errors: { [K in keyof T]?: string };
	  }
	| {
			success: true;
			data: T;
			errors: null;
	  };

export function validateWithZod<T extends ZodSchema<any>>(
	schema: T,
	data: unknown
): ValidationResult<z.infer<T>> {
	try {
		const validatedData = schema.parse(data);
		return { success: true, data: validatedData, errors: null };
	} catch (error) {
		if (error instanceof ZodError) {
			const errorDetails: { [key: string]: string } = {};
			error.errors.forEach((err) => {
				const path = err.path.join('.');
				errorDetails[path] = err.message;
			});
			return {
				success: false,
				data: null,
				errors: errorDetails as { [K in keyof z.infer<T>]?: string }
			};
		}
		throw error; // Rethrow if it's not a ZodError
	}
}

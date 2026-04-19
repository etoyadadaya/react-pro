import { InputHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

type InputVariant = 'default' | 'search';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	variant?: InputVariant;
}

const variantClassMap: Record<InputVariant, string> = {
	default: s.default,
	search: s.search,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, variant = 'default', ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={classNames(s.input, variantClassMap[variant], className)}
				{...props}
			/>
		);
	}
);

Input.displayName = 'Input';

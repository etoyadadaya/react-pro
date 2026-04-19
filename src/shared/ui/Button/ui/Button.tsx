import { ButtonHTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	fullWidth?: boolean;
}

const variantClassMap: Record<ButtonVariant, string> = {
	primary: s.primary,
	secondary: s.secondary,
	ghost: s.ghost,
	icon: s.icon,
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			children,
			className,
			fullWidth = false,
			type = 'button',
			variant = 'primary',
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				type={type}
				className={classNames(
					s.button,
					variantClassMap[variant],
					{ [s.fullWidth]: fullWidth },
					className
				)}
				{...props}>
				{children}
			</button>
		);
	}
);

Button.displayName = 'Button';

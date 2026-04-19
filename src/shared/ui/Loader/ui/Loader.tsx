import classNames from 'classnames';
import s from './Loader.module.css';

type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
	centered?: boolean;
	className?: string;
	size?: LoaderSize;
}

const sizeClassMap: Record<LoaderSize, string> = {
	sm: s.sm,
	md: s.md,
	lg: s.lg,
};

export const Loader = ({
	centered = false,
	className,
	size = 'md',
}: LoaderProps) => {
	return (
		<div
			aria-label='Загрузка'
			className={classNames({ [s.centered]: centered }, className)}
			role='status'>
			<div className={classNames(s.loader, sizeClassMap[size])} />
		</div>
	);
};

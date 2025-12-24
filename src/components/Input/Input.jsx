import cn from 'classnames';
import styles from './styles.module.css';

function Input({ isValid, kind, ...props }) {
	return (
		<input
			{...props}
			className={cn(styles.input, {
				[styles.invalid]: !isValid && kind != 'tag',
				[styles.inputTitle]: kind === 'title',
			})}
		/>
	);
}

export default Input;

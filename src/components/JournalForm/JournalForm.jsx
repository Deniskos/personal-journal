import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';

import styles from './styles.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE } from './state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const { isValid, values, isFormReadyForSubmit } = formState || {};

	useEffect(() => {
		let timer;
		if (!isValid.date || !isValid.title || !isValid.text) {
			timer = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyForSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' }); // очистка формы
		}
	}, [isFormReadyForSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({ type: 'SUBMIT', payload: formProps });
		// dispatchForm({ type: 'CLEAR' }); // очистка формы
		e.target.reset();
	};

	return (
		<form className={styles.journalForm} onSubmit={addJournalItem}>
			<input
				type="text"
				name="title"
				className={cn(styles.formItem, styles.title, {
					[styles.invalid]: !isValid.title,
				})}
			/>
			<div>
				<div className={styles.inputFieldWrapper}>
					<label for="date" className={cn(styles.label, styles.dateLabel)}>
						Дата
					</label>
					<input
						id="date"
						type="date"
						name="date"
						className={cn(styles.formItem, {
							[styles.invalid]: !isValid.date,
						})}
					/>
				</div>

				<div className={styles.inputFieldWrapper}>
					<label for="tag" className={cn(styles.label, styles.tagLabel)}>
						Метки
					</label>
					<input
						id="tag"
						type="text"
						name="tag"
						className={cn(styles.formItem, styles.tag)}
					/>
				</div>
			</div>

			<textarea
				name="text"
				id=""
				cols="30"
				rows="25"
				className={cn(styles.textarea, styles.formItem, {
					[styles.invalid]: !isValid.text,
				})}
			></textarea>

			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;

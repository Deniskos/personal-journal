import { useEffect, useReducer } from 'react';
import Button from '../Button/Button';

import styles from './styles.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE, actionTypes } from './state';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const { isValid, values, isFormReadyForSubmit } = formState || {};

	useEffect(() => {
		let timer;
		if (!isValid.date || !isValid.title || !isValid.text) {
			timer = setTimeout(() => {
				dispatchForm({ type: actionTypes.RESET_VALIDITY });
			}, 2000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyForSubmit) {
			onSubmit(values);
			dispatchForm({ type: actionTypes.CLEAR }); // очистка формы
		}
	}, [isFormReadyForSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispatchForm({ type: actionTypes.SUBMIT, payload: formProps });
	};

	const changeValue = (event) => {
		dispatchForm({
			type: actionTypes.CHANGE_VALUE,
			payload: {
				[event.target.name]: event.target.value,
			},
		});
	};

	return (
		<form className={styles.journalForm} onSubmit={addJournalItem}>
			<input
				type="text"
				name="title"
				value={values.title}
				onChange={changeValue}
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
						value={values.date}
						onChange={changeValue}
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
						value={values.tag}
						onChange={changeValue}
						className={cn(styles.formItem, styles.tag)}
					/>
				</div>
			</div>

			<textarea
				name="text"
				id=""
				cols="30"
				rows="25"
				value={values.text}
				onChange={changeValue}
				className={cn(styles.textarea, styles.formItem, {
					[styles.invalid]: !isValid.text,
				})}
			></textarea>

			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;

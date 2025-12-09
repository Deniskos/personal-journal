import { useState } from 'react';
import Button from '../Button/Button';

import styles from './styles.module.css';
import cn from 'classnames';

function JournalForm({ onSubmit }) {
	const [formValidState, setFormValidState] = useState({
		title: true,
		date: true,
		text: true,
	});
	const [titleText, setTitleText] = useState('');

	const changeTitle = (e) => {
		setTitleText(e.target.value);

		if (!e.target.value.length) {
			setFormValidState((state) => ({ ...state, title: false }));
		} else {
			setFormValidState((state) => ({ ...state, title: true }));
		}
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);

		let isFormValid = true;

		if (!formProps.title?.trim().length) {
			setFormValidState((state) => ({ ...state, title: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, title: true }));
		}
		if (!formProps.date) {
			setFormValidState((state) => ({ ...state, date: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, date: true }));
		}
		if (!formProps.text?.trim().length) {
			setFormValidState((state) => ({ ...state, text: false }));
			isFormValid = false;
		} else {
			setFormValidState((state) => ({ ...state, text: true }));
		}
		if (!isFormValid) {
			return;
		}

		onSubmit(formProps);
		setTitleText('');
		e.target.reset();
	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<input
				type="text"
				name="title"
				value={titleText}
				onChange={changeTitle}
				className={cn(styles.formItem, styles.title, {
					[styles.invalid]: !formValidState.title,
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
						className={cn({
							[styles.invalid]: !formValidState.date,
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
				className={cn(styles.textarea, {
					[styles.invalid]: !formValidState.text,
				})}
			></textarea>
			<Button>Сохранить</Button>
		</form>
	);
}

export default JournalForm;

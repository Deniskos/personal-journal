import { useState } from 'react';
import Button from '../Button/Button';

import './styles.css';

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
		<form className="journal-form" onSubmit={addJournalItem}>
			<input
				type="text"
				name="title"
				value={titleText}
				onChange={changeTitle}
				style={{
					borderColor: formValidState.title ? undefined : 'red',
				}}
			/>
			<input
				type="date"
				name="date"
				style={{
					borderColor: formValidState.date ? undefined : 'red',
				}}
			/>
			<input type="text" name="tag" />
			<textarea
				name="text"
				id=""
				cols="30"
				rows="10"
				style={{
					borderColor: formValidState.text ? undefined : 'red',
				}}
			></textarea>
			<Button type="submit">Сохранить</Button>
		</form>
	);
}

export default JournalForm;

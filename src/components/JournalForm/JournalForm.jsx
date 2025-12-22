import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

import styles from './styles.module.css';
import cn from 'classnames';
import { formReducer, INITIAL_STATE, actionTypes } from './state';
import { UserContext } from '../../context/User.context';
import { EditContext } from '../../context/Edit.context';
import { formatDateForInput } from '../../helpers/formatDateForInput';
import { useLocalStorage } from '../../hooks/useLocalstorage';
import { convertDatesForClient } from '../../helpers/convertDatesForClient';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);

	const { isValid, values, isFormReadyForSubmit } = formState || {};
	const { userId } = useContext(UserContext);
	const { editItemId, setEditItemId, isEditMode, setIsEditMode } =
		useContext(EditContext);
	const [items] = useLocalStorage('data', isEditMode);
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	useEffect(() => {
		// режим редактирования заметки
		if (isEditMode) {
			dispatchForm({
				type: actionTypes.SET_EDIT_JOURNAL_ITEM,
				payload: {
					...convertDatesForClient(items)
						.filter((item) => item.id === editItemId)
						.map((item) => {
							return {
								...item,
								date: formatDateForInput(item.date),
							};
						})[0],
				},
			});
		}
	}, [isEditMode, editItemId, items]);

	useEffect(() => {
		let timer;
		if (!isValid.date || !isValid.title || !isValid.text) {
			focusError(isValid);
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
			onSubmit({ userId, ...values }, isEditMode);
			dispatchForm({ type: actionTypes.CLEAR }); // очистка формы
			setEditItemId(null);
			setIsEditMode(false);
		}
	}, [isFormReadyForSubmit, values, onSubmit, userId]);

	const focusError = (isValid) => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.text:
				textRef.current.focus();
		}
	};

	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({ type: actionTypes.SUBMIT, payload: values });
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
			<Input
				ref={titleRef}
				kind="title"
				name="title"
				type="text"
				value={values.title}
				onChange={changeValue}
				isValid={isValid.title}
			/>
			<div>
				<div className={styles.inputFieldWrapper}>
					<label htmlFor="date" className={cn(styles.label, styles.dateLabel)}>
						Дата
					</label>
					<Input
						id="date"
						type="date"
						name="date"
						ref={dateRef}
						value={values.date}
						onChange={changeValue}
						isValid={isValid.date}
					/>
				</div>

				<div className={styles.inputFieldWrapper}>
					<label htmlFor="tag" className={cn(styles.label, styles.tagLabel)}>
						Метки
					</label>
					<Input
						id="tag"
						kind="tag"
						type="text"
						name="tag"
						value={values.tag}
						onChange={changeValue}
					/>
				</div>
			</div>

			<textarea
				name="text"
				id=""
				cols="30"
				rows="25"
				ref={textRef}
				value={values.text}
				onChange={changeValue}
				className={cn(styles.textarea, {
					[styles.invalid]: !isValid.text,
				})}
			></textarea>

			<Button>{isEditMode ? 'Сохранить изменения' : 'Сохранить'}</Button>
		</form>
	);
}

export default JournalForm;

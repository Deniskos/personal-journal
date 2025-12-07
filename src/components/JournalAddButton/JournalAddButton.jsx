import CardButton from '../CardButton/CardButton';

import './styles.css';

function JournalAddButton() {
	return (
		<CardButton className="journal-add">
			<img src="/plus.svg" alt="Плюсик" />
			Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;

import './styles.css';
import { formatDateForJournal } from '../../helpers/formatDateForJournal';

function JournalItem(data) {
	const { title, text, date } = data.data;

	return (
		<>
			<h2 className="journal-item__header">{title}</h2>
			<h2 className="journal-item__body">
				<div className="journal-item__date">{formatDateForJournal(date)}</div>
				<div className="journal-item__text">{text}</div>
			</h2>
		</>
	);
}

export default JournalItem;

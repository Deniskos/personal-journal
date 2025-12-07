import './styles.css';

function JournalItem(data) {
	const { title, text, date } = data.data;

	const formatedDate = date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	return (
		<>
			<h2 className="journal-item__header">{title}</h2>
			<h2 className="journal-item__body">
				<div className="journal-item__date">{formatedDate}</div>
				<div className="journal-item__text">{text}</div>
			</h2>
		</>
	);
}

export default JournalItem;

import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';

import './styles.css';

function JournalList({ items }) {
	if (items.length === 0) {
		return <p>У вас нет ни одной записи</p>;
	}

	const dataSort = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<div className="journal-list">
			{items.sort(dataSort).map((item) => {
				return (
					<CardButton key={item.id}>
						<JournalItem data={item} />
					</CardButton>
				);
			})}
		</div>
	);
}

export default JournalList;

import JournalItem from '../JournalItem/JournalItem';
import CardButton from '../CardButton/CardButton';

import './styles.css';
import { useContext } from 'react';
import { UserContext } from '../../context/User.context';

function JournalList({ items }) {
	const { userId } = useContext(UserContext);
	if (items?.length === 0) {
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
			{items
				?.filter((item) => item.userId === userId)
				.sort(dataSort)
				.map((item) => (
					<CardButton key={item.id}>
						<JournalItem data={item} />
					</CardButton>
				))}
		</div>
	);
}

export default JournalList;

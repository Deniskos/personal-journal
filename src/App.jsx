import JournalItem from './components/JournalItem/JournalItem';
import CardButton from './components/CardButton/CardButton';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';

import './App.css';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const ENITIAL_DATA = [
	{
		id: 1,
		title: 'Подготовка к обновлению курсов',
		text: 'Горные походы открывают удивительные природные ландшафты',
		date: new Date(),
	},
	{
		id: 2,
		title: 'Поход в горы',
		text: 'Думал, что очень много време...',
		date: new Date(),
	},
];

function App() {
	const [notes, setNotesData] = useState(ENITIAL_DATA);

	const addNote = (note) => {
		const noteDateObj = new Date(note.date);
		const objectNote = {
			...note,
			date: noteDateObj,
			id: Math.max(...notes.map((noteItem) => noteItem.id)) + 1,
		};
		setNotesData((oldNotes) => {
			return [...oldNotes, objectNote];
		});
	};

	const dataSort = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					{notes.sort(dataSort).map((note) => {
						return (
							<CardButton key={note.id}>
								<JournalItem data={note} />
							</CardButton>
						);
					})}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addNote} />
			</Body>
		</div>
	);
}

export default App;

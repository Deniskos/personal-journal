import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';

import './App.css';
import JournalForm from './components/JournalForm/JournalForm';
import { useState } from 'react';

const ENITIAL_DATA = [
	// {
	// 	id: 1,
	// 	title: 'Подготовка к обновлению курсов',
	// 	text: 'Горные походы открывают удивительные природные ландшафты',
	// 	date: new Date(),
	// },
	// {
	// 	id: 2,
	// 	title: 'Поход в горы',
	// 	text: 'Думал, что очень много време...',
	// 	date: new Date(),
	// },
];

function App() {
	const [notes, setNotesData] = useState(ENITIAL_DATA);

	const addNote = (note) => {
		const noteDateObj = new Date(note.date);
		const objectNote = {
			...note,
			date: noteDateObj,
			id:
				(notes.length ? Math.max(...notes.map((noteItem) => noteItem.id)) : 0) +
				1,
		};
		setNotesData((oldNotes) => {
			return [...oldNotes, objectNote];
		});
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={notes} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addNote} />
			</Body>
		</div>
	);
}

export default App;

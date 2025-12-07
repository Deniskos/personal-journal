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
		title: 'Подготовка к обновлению курсов',
		text: 'Горные походы открывают удивительные природные ландшафты',
		date: new Date(),
	},
	{
		title: 'Поход в горы',
		text: 'Думал, что очень много време...',
		date: new Date(),
	},
];

function App() {
	const [notes, setNotesData] = useState(ENITIAL_DATA);

	const addNote = (note) => {
		const noteDateObj = new Date(note.date);
		const objectNote = { ...note, date: noteDateObj };
		setNotesData((oldNotes) => {
			return [...oldNotes, objectNote];
		});
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					{notes.map((note) => {
						return (
							<CardButton key={note.text}>
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

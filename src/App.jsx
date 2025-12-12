import { useEffect, useState } from 'react';

import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';

import './App.css';
import JournalForm from './components/JournalForm/JournalForm';

function App() {
	const [notes, setNotesData] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));

		if (data) {
			setNotesData(
				data.map((item) => ({
					...item,
					date: new Date(item.date),
				}))
			);
		}
	}, []);

	useEffect(() => {
		if (notes.length) {
			localStorage.setItem('data', JSON.stringify(notes));
		}
	}, [notes]);

	const addNote = (note) => {
		const noteDateObj = new Date(note.date);
		const objectNote = {
			...note,
			date: noteDateObj,
			id:
				notes.length > 0
					? Math.max(...notes.map((noteItem) => noteItem.id)) + 1
					: 1,
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

// import { useContext } from 'react';
import { useLocalStorage } from '../src/hooks/useLocalstorage';

import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import Body from './layouts/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';

import './App.css';
import UserContextProvider from './context/User.context';
import EditContextProvider from './context/Edit.context';
import { convertDatesForClient } from './helpers/convertDatesForClient';

// function mapItems(items) {
// 	if (!items) {
// 		return [];
// 	}
// 	return items.map((i) => ({
// 		...i,
// 		date: new Date(i.date),
// 	}));
// }

function App() {
	const [items, saveData] = useLocalStorage('data');
	// const { setIsEditMode, isEditMode } = useContext(EditContext);

	const submitItem = (sentItem, isEditMode) => {
		let submitData = [];

		if (isEditMode) {
			submitData = [
				...convertDatesForClient(
					items.map((item) => {
						if (item.id === sentItem.id) {
							return sentItem;
						}
						return item;
					})
				),
			];
		} else {
			submitData = [
				...convertDatesForClient(items),
				{
					...sentItem,
					title: sentItem.title,
					text: sentItem.text,
					date: new Date(sentItem.date),
					id: items?.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
				},
			];
		}

		saveData(submitData);
	};

	return (
		<UserContextProvider>
			<EditContextProvider>
				<div className="app">
					<LeftPanel>
						<Header />
						<JournalAddButton />
						<JournalList items={convertDatesForClient(items)} />
					</LeftPanel>
					<Body>
						<JournalForm onSubmit={submitItem} />
					</Body>
				</div>
			</EditContextProvider>
		</UserContextProvider>
	);
}

export default App;

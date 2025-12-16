import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
	const [value, setData] = useState(() => {
		const initStorage = localStorage.getItem(key);
		if (!initStorage) {
			return initialValue;
		}
		try {
			return JSON.parse(initStorage);
		} catch {
			return initialValue;
		}
	});

	const setValue = (newValue) => {
		try {
			localStorage.setItem(key, JSON.stringify(newValue));
			setData(newValue);
		} catch (e) {
			console.error(e);
		}
	};

	return [value, setValue];
};

const LocalStorage = () => {
	const [value, setValue] = useLocalStorage('userName', 'Гость');
	return (
		<div>
			useLocalStorage: {value}{' '}
			<button onClick={() => setValue('Иван')}>кнопка</button>
			<button
				onClick={() => {
					localStorage.removeItem('userName');
					setValue('Гость');
				}}
			>
				Clear localStorage
			</button>
		</div>
	);
};

export default LocalStorage;

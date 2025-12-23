import { useState, useEffect, } from 'react';

export function useLocalStorage(key, isEditMode = false) {
	const [data, setData] = useState([]);
		
	useEffect(() => {
		const response = JSON.parse(localStorage.getItem(key));
    
		if (response) {
			setData(response);			
		}
	
	}, [isEditMode, key]);
	
    
	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
}
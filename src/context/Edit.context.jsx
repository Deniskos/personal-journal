import { createContext, useState } from 'react';

export const EditContext = createContext();

const EditContextProvider = ({ children }) => {
	const [editItemId, setEditItem] = useState(null);
	const [isEditMode, setIsEditMode] = useState(false);
	const setEditItemId = (id) => {
		setEditItem(id);
		setIsEditMode(true);
	};
	return (
		<EditContext.Provider
			value={{ editItemId, setEditItemId, isEditMode, setIsEditMode }}
		>
			{children}
		</EditContext.Provider>
	);
};

export default EditContextProvider;

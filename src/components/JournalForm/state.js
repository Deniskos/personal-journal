export const actionTypes = {
	RESET_VALIDITY:  'RESET_VALIDITY',
	CHANGE_VALUE: 'CHANGE_VALUE',
	SUBMIT: 'SUBMIT',
	CLEAR: 'CLEAR',
};

export const INITIAL_STATE = {	
	values: {
		title: '',
		tag: '',
		date: '',		
		text: '',
	},
	isValid: {
		date: true,
		title: true,
		text: true,	
	},
	isFormReadyForSubmit: false
};

export const formReducer = (state, action) => {
	const {payload} = action;
	switch(action.type) {
	case actionTypes.RESET_VALIDITY:
		return {...state, isValid: INITIAL_STATE.isValid};
	case actionTypes.CHANGE_VALUE: {
		return {
			...state,
			values: {...state.values, ...payload},
		};	
	}		
	case actionTypes.SUBMIT: {		
		const isTextValidity = state.values.text.trim().length;
		const isTitleValidity = state.values.title.trim().length;
		const isDateValidity = state.values.date;

		return {
			...state,
			isValid: {
				text: isTextValidity,
				title: isTitleValidity,
				date: isDateValidity,
			},
			isFormReadyForSubmit: isTextValidity && isTitleValidity && isDateValidity,
		};
	};
	case actionTypes.CLEAR:
		return {...state, values: INITIAL_STATE.values, isFormReadyForSubmit: false};
	}	
};
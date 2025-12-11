export const INITIAL_STATE = {	
	values: {
		text: '',
		title: '',
		date: '',
		tag: '',
	},
	isValid: {
		text: true,
		title: true,
		date: true,
	},
	isFormReadyForSubmit: false
};

export const formReducer = (state, action) => {
	switch(action.type) {
	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const {payload} = action;
		const isTextValidity = Boolean(payload.text);
		const isTitleValidity = Boolean(payload.title);
		const isDateValidity = Boolean(payload.date);

		return {
			values: action.payload,
			isValid: {
				text: isTextValidity,
				title: isTitleValidity,
				date: isDateValidity,
			},
			isFormReadyForSubmit: isTextValidity && isTitleValidity && isDateValidity,
		};
	};
	case 'CLEAR':
		return {...state, values: INITIAL_STATE.values};
	}
};
export function convertDatesForClient(data) {	
	if (!data) {
		return [];
	}
	return data.map((i) => ({
		...i,
		date: new Date(i.date),
	}));
}

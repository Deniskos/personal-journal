export function formatDateForJournal(date) {
	return date.toLocaleDateString('ru-RU', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});
}
import { useEffect, useState } from 'react';

function NotificationFunc({ message }) {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		setIsVisible(true);
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [message]);

	if (!isVisible || !message) return null;

	return <div>{message}</div>;
}

function Notification() {
	return <NotificationFunc message="Какой-то текст" />;
}

export default Notification;

import { useEffect, useRef, useState } from 'react';

function AutoCounter() {
	const [count, setCount] = useState(0);
	const intervalIdRef = useRef(null);

	useEffect(() => {
		intervalIdRef.current = setInterval(() => {
			setCount((prev) => prev + 1);
		}, 1000);
		return () => {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
		};
	}, []);

	const stop = () => {
		if (intervalIdRef.current) {
			clearInterval(intervalIdRef.current);
		}
	};

	return (
		<div>
			<div>{count}</div>
			<button onClick={stop}>Остановить счетчик</button>
		</div>
	);
}

export default AutoCounter;

import { useEffect, useState, useRef } from 'react';

function PreviousValueTracker() {
	const [count, setCount] = useState(0);
	const prevCountRef = useRef(undefined);

	useEffect(() => {
		prevCountRef.current = count;
	}, [count]);

	const prevCount = prevCountRef.current;

	return (
		<div>
			<div>
				Текущее: {count}, Предыдущее: {prevCount || 'undefined'}
			</div>
			<button onClick={() => setCount((prev) => prev + 1)}>Увеличить</button>
		</div>
	);
}

export default PreviousValueTracker;

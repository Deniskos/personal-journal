import { useRef } from 'react';

function ClickCounter() {
	const countRef = useRef(0);
	return (
		<div>
			<button onClick={() => (countRef.current = countRef.current + 1)}>
				Клик без ре-рендера
			</button>
			<button
				onClick={() => alert(`Показать количество кликов: ${countRef.current}`)}
			>
				Показать количество кликов
			</button>
		</div>
	);
}

export default ClickCounter;

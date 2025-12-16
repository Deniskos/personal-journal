import React from 'react';

// Дочерний компонент Button
const Button = React.memo(({ onClick, children }) => {
	return <button onClick={onClick}>{children}</button>;
});

// Основной компонент
function Counter() {
	const [count, setCount] = React.useState(0);

	const setCountMemo = React.useCallback(() => setCount(count + 1), [count]);
	return (
		<div>
			<div>{count}</div>
			<Button onClick={setCountMemo}>Увеличить на 1</Button>
		</div>
	);
}

export default Counter;

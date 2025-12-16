import { useEffect, useRef, useState } from 'react';

function useTimer(initialSeconds) {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [isRunning, setIsRunning] = useState(false);
	const intervalIdRef = useRef(null);

	useEffect(() => {
		if (isRunning) {
			intervalIdRef.current = setInterval(
				() =>
					setSeconds((prev) => {
						if (prev <= 0) {
							setIsRunning(false);
							clearInterval(intervalIdRef.current);
							return 0;
						}
						return prev - 1;
					}),
				1000
			);
		} else {
			clearInterval(intervalIdRef.current);
		}

		return () => {
			if (intervalIdRef.current) {
				clearInterval(intervalIdRef.current);
			}
		};
	}, [isRunning]);

	const start = () => {
		if (seconds > 0) {
			setIsRunning(seconds > 0);
		}
	};

	const pause = () => {
		setIsRunning(false);
	};

	const reset = () => {
		setIsRunning(false);
		setSeconds(initialSeconds);
	};

	return {
		seconds,
		isRunning,
		start,
		pause,
		reset,
	};
}

function Timer() {
	const { seconds, isRunning, start, pause, reset } = useTimer(120);
	return (
		<div>
			<div>{seconds}</div>
			<button onClick={start}>Старт</button>
			<button onClick={pause}>Пауза</button>
			<button onClick={reset}>Сброс</button>
		</div>
	);
}

export default Timer;

import { useEffect, useState } from 'react';

function WindowSizeTracker() {
	const [windowSize, setWindowSize] = useState(() => ({
		width: window.innerWidth,
		height: window.innerHeight,
	}));

	useEffect(() => {
		const handleResize = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return (
		<div>
			<div>
				Ширина: {windowSize.width}, Высота: {windowSize.height}
			</div>
		</div>
	);
}

export default WindowSizeTracker;

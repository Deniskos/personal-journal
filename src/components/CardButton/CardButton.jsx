import { useContext } from 'react';
import { EditContext } from '../../context/Edit.context';
import './styles.css';

function CardButton({ children, className, journalId }) {
	const { setEditItemId } = useContext(EditContext);
	const cl = 'card-button' + (className ? ' ' + className : '');

	return (
		<button className={cl} onClick={() => setEditItemId(journalId)}>
			{children}
		</button>
	);
}

export default CardButton;

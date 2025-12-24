import { useContext } from 'react';
import styles from './styles.module.css';
import { UserContext } from '../../context/User.context';

function SelectUser() {
	const { userId, setUserId } = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<select
			className={styles.select}
			name="user"
			id="user"
			value={userId}
			onChange={changeUser}
		>
			<option value="1">Антон</option>
			<option value="2">Вася</option>
		</select>
	);
}

export default SelectUser;

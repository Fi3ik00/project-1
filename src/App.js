import styles from './app.module.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	const getCurrentTime = () => {
		return new Intl.DateTimeFormat('ru', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
		}).format(new Date());
	};

	let isValueValid = value.length < 3 ? false : true;
	const updateList = [
		...list,
		{ id: Date.now(), value: value, time: getCurrentTime() },
	];

	const onInputButtonClick = () => {
		let promptValue = prompt('Введите значение');

		if (promptValue.length < 3) {
			setError('Строка должа содержать не менее 3 символов');
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			setList(value);
			setValue('');
			setList(updateList);
		}
	};

	return (
		<div className={styles['app']}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' ? <div className={styles['error']}>{error}</div> : null}

			<div className={styles['buttons-container']}>
				<button className={styles['button']} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles['button']}
					disabled={!isValueValid}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length < 1 ? (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				) : null}

				<ul className={styles['list']}>
					{list.map((item) => (
						<li className={styles['list-item']} key={item.id}>
							{`${item.value} - ${item.time}`}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

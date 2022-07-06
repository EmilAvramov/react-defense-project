import { useState } from 'react';
import styles from '../styles/components/Home.module.scss';

const SearchBar = () => {
	const [flyout, setFlyout] = useState(false);
	const [formData, setFormData] = useState({
		text: '',
        PC: '',
        XBOX: '',
        PS4: '',
        PS5: '',
        Switch: '',
	});
	const toggleSearch = () => {
		setFlyout((flyout) => !flyout);
		const menu = document.querySelector('form');
		flyout ? (menu.style.display = 'block') : (menu.style.display = 'none');
	};
	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData((prevData) => {
			return {
				...prevData,
				[name]: type === "checkbox" ? checked: value,
			};
		});
	};

	const applyFilters = (e) => {
		e.preventDefault();
		toggleSearch();
		console.log({ ...formData });
	};

	return (
		<div className={styles['search__container']}>
			<input type='text' name='search' id='search' />
			<i className='fa-solid fa-filter' onClick={toggleSearch}></i>
			<form
				onSubmit={applyFilters}
				className={styles['search__flyout']}
				action=''
			>
				<fieldset className={styles['search__filters']}>
					<legend>Search By:</legend>
					<label htmlFor='name'>Name</label>
					<input
						type='radio'
						name='text'
						value='name'
						onChange={handleChange}
					/>
					<label htmlFor='company'>Company</label>
					<input
						type='radio'
						name='text'
						value='company'
						onChange={handleChange}
					/>
					<label htmlFor='description'>Description</label>
					<input
						type='radio'
						name='text'
						value='description'
						onChange={handleChange}
					/>
				</fieldset>
                <fieldset className={styles['search__filters']}>
                    <legend>Platforms</legend>
                    <input type="checkbox" name="pc" value={formData} />
                </fieldset>
				<button>Confirm</button>
			</form>
		</div>
	);
};

export default SearchBar;

import { useState } from 'react';
import styles from '../styles/components/Home.module.scss';

const SearchBar = () => {
	const [flyout, setFlyout] = useState(false);
	const toggleSearch = () => {
		setFlyout((flyout) => !flyout);
		const menu = document.querySelector('form > div');
		flyout ? (menu.style.display = 'block') : (menu.style.display = 'none');
	};

	const [formData, setFormData] = useState({
        string:'',
		category: '',
		PC: false,
		PS4: false,
		PS5: false,
		XBOX: false,
		Switch: false,
	});
	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData((prevData) => {
			console.log(name, value, checked, type);
			return {
				...prevData,
				[name]: type === 'checkbox' ? checked : value,
			};
		});
	};

	const clear = () =>
		setFormData({
            string:'',
			category: '',
			PC: false,
			PS4: false,
			PS5: false,
			XBOX: false,
			Switch: false,
		});

    const submit = (e) => {
        e.preventDefault();
        console.log({...formData})
        clear()
    }

	const applyFilters = (e) => {
		e.preventDefault();
        toggleSearch()
	};

	const clearData = (e) => {
		e.preventDefault();
        clear()
	};

	return (
		<form onSubmit={applyFilters} className={styles['search__container']}>
			<input type='text' name='string' onChange={handleChange} value={formData.string}/>
			<i className='fa-solid fa-filter' onClick={toggleSearch}></i>
            <button onClick={submit}>Search</button>
			<div className={styles['search__flyout']}>
				<fieldset className={styles['search__filters']}>
					<legend>Search By:</legend>
					<input
						type='radio'
						name='category'
						value='name'
				        onChange={handleChange}
						checked={formData.category === 'name'}		
					/>
					<label htmlFor='name'>Name</label>
					<input
						type='radio'
						name='category'
						value='company'
						onChange={handleChange}
						checked={formData.category === 'company'}
					/>
					<label htmlFor='company'>Company</label>
					<input
						type='radio'
						name='category'
						value='description'
						onChange={handleChange}
						checked={formData.category === 'description'}
					/>
					<label htmlFor='description'>Description</label>
				</fieldset>
				<fieldset className={styles['search__filters']}>
					<legend>Platforms</legend>
					<input
						type='checkbox'
						name='PC'
						checked={formData.PC}
						onChange={handleChange}
					/>
					<label htmlFor='PC'>PC</label>
					<input
						type='checkbox'
						name='PS4'
						checked={formData.PS4}
						onChange={handleChange}
					/>
					<label htmlFor='PS4'>PS4</label>
					<input
						type='checkbox'
						name='PS5'
						checked={formData.PS5}
						onChange={handleChange}
					/>
					<label htmlFor='PS5'>PS5</label>
					<input
						type='checkbox'
						name='XBOX'
						checked={formData.XBOX}
						onChange={handleChange}
					/>
					<label htmlFor='XBOX'>XBOX</label>
					<input
						type='checkbox'
						name='Switch'
						checked={formData.Switch}
						onChange={handleChange}
					/>
					<label htmlFor='Switch'>Switch</label>
				</fieldset>
				<div className={styles['search__filters']}>
					<button>Confirm</button>
					<button onClick={clearData}>Clear</button>
				</div>
			</div>
		</form>
	);
};

export default SearchBar;

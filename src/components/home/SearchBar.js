import { useState } from 'react';
import styles from '../../styles/components/Home.module.scss';

const SearchBar = (props) => {
	const [flyout, setFlyout] = useState(false);

	const [formData, setFormData] = useState({
		string: '',
		category: '',
		platform: '',
	});

	const handleChange = (e) => {
		const { name, value, checked, type } = e.target;
		setFormData((prevData) => {
			return {
				...prevData,
				[name]: type === 'checkbox' ? checked : value,
			};
		});
	};

	const clear = () =>
		setFormData({
			string: '',
			category: '',
			platform: '',
		});

	const submit = (e) => {
		e.preventDefault();
		props.sendData(formData);
		clear();
	};

	const toggleSearch = () => {
		setFlyout((flyout) => !flyout);
	};

	const applyFilters = (e) => {
		e.preventDefault();
		toggleSearch();
	};

	const clearData = (e) => {
		e.preventDefault();
		clear();
	};

	return (
		<form onSubmit={applyFilters} className={styles['search__container']}>
			<input
				type='text'
				name='string'
				onChange={handleChange}
				value={formData.string}
			/>
			<i className='fa-solid fa-filter' onClick={toggleSearch}></i>
			{!props.loading ? (
				<button onClick={submit}>Search</button>
			) : (
				<button onClick={submit} disabled>
					Search
				</button>
			)}
			{flyout && <div className={styles['search__flyout']}>
				<fieldset className={styles['search__filters']}>
					<legend>Search By:</legend>
					<input
						type='radio'
						name='category'
						value='name'
						onChange={handleChange}
						checked={formData.category === 'name'}
					/>
					<label htmlFor='name'>Game Name</label>
					<input
						type='radio'
						name='category'
						value='company'
						onChange={handleChange}
						checked={formData.category === 'company'}
					/>
					<label htmlFor='company'>Company</label>
				</fieldset>
				<fieldset className={styles['search__filters']}>
					<legend>Platforms</legend>
					<input
						type='radio'
						name='platform'
						value='PC'
						checked={formData.platform === 'PC'}
						onChange={handleChange}
					/>
					<label htmlFor='PC'>PC</label>
					<input
						type='radio'
						name='platform'
						value='PS4'
						checked={formData.platform === 'PS4'}
						onChange={handleChange}
					/>
					<label htmlFor='PS4'>PS4</label>
					<input
						type='radio'
						name='platform'
						value='PS5'
						checked={formData.platform === 'PS5'}
						onChange={handleChange}
					/>
					<label htmlFor='PS5'>PS5</label>
					<input
						type='radio'
						name='platform'
						value='XBOX'
						checked={formData.platform === 'XBOX'}
						onChange={handleChange}
					/>
					<label htmlFor='XBOX'>XBOX</label>
					<input
						type='radio'
						name='platform'
						value='Switch'
						checked={formData.platform === 'Switch'}
						onChange={handleChange}
					/>
					<label htmlFor='Switch'>Switch</label>
				</fieldset>
				<div className={styles['search__filters']}>
					<button>Confirm</button>
					<button onClick={clearData}>Clear</button>
				</div>
			</div>}
		</form>
	);
};

export default SearchBar;

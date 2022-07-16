import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from '../../styles/components/Search.module.scss';

const SearchBar = (props) => {
	// Manage form data
	const { register, handleSubmit, reset } = useForm();

	// Manage flyout menu
	const [flyout, setFlyout] = useState(false);

	const toggleSearch = () => {
		setFlyout((flyout) => !flyout);
	};

	// Change handlers
	const submitData = (data) => {
		props.sendData(data);
		reset();
	};

	const applyFilters = (e) => {
		e.preventDefault();
		toggleSearch();
	};


	return (
		<form onSubmit={handleSubmit(submitData)} className={styles['search__container']}>
			<input {...register('string')} type='text' />
			<i className='fa-solid fa-filter' onClick={toggleSearch}></i>

			<button disabled={props.loading}>
				Search
			</button>

			{flyout && (
				<div className={styles['search__flyout']}>
					<fieldset className={styles['search__filters']}>
						<legend>Search By:</legend>
						<input
							{...register('category')}
							type='radio'
							name='category'
							value='name'
						/>
						<label htmlFor='name'>Game Name</label>
						<input
							{...register('category')}
							type='radio'
							name='category'
							value='company'
						/>
						<label htmlFor='company'>Company</label>
					</fieldset>
					<fieldset className={styles['search__filters']}>
						<legend>Platforms</legend>
						<input {...register('PC')} type='checkbox' />
						<label htmlFor='PC'>PC</label>
						<input {...register('PS4')} type='checkbox' />
						<label htmlFor='PS4'>PS4</label>
						<input {...register('PS5')} type='checkbox' />
						<label htmlFor='PS5'>PS5</label>
						<input {...register('XBOX')} type='checkbox' />
						<label htmlFor='XBOX'>XBOX</label>
						<input {...register('Switch')} type='checkbox' />
						<label htmlFor='Switch'>Switch</label>
					</fieldset>
					<div className={styles['search__filters']}>
						<button onClick={applyFilters}>Confirm</button>
						<button onClick={() => reset()}>Clear</button>
					</div>
				</div>
			)}
		</form>
	);
};

export default SearchBar;

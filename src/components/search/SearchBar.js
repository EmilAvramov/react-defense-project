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
		<form
			onSubmit={handleSubmit(submitData)}
			className={styles['search__container']}
		>
			<input {...register('string')} type='text' />
			<i className='fa-solid fa-filter' onClick={toggleSearch}></i>

			<button disabled={props.loading}>Search</button>

			{flyout && (
				<div className={styles['search__flyout']}>
					<fieldset className={styles['search__filters']}>
						<legend className={styles['search__legend1']}>
							Search By:
						</legend>
						<input
							{...register('category')}
							type='radio'
							name='category'
							value='name'
							className={styles['search__radio1']}
						/>
						<label
							htmlFor='name'
							className={styles['search__text1']}
						>
							Game Name
						</label>
						<input
							{...register('category')}
							type='radio'
							name='category'
							value='company'
							className={styles['search__radio2']}
						/>
						<label
							htmlFor='company'
							className={styles['search__text2']}
						>
							Company
						</label>
					</fieldset>
					<fieldset className={styles['search__filters']}>
						<legend className={styles['search__legend2']}>
							Platforms
						</legend>
						<input
							{...register('PC')}
							type='checkbox'
							className={styles['search__check1']}
						/>
						<label htmlFor='PC' className={styles['search__text3']}>
							PC
						</label>
						<input
							{...register('PS4')}
							type='checkbox'
							className={styles['search__check2']}
						/>
						<label
							htmlFor='PS4'
							className={styles['search__text4']}
						>
							PS4
						</label>
						<input
							{...register('PS5')}
							type='checkbox'
							className={styles['search__check3']}
						/>
						<label
							htmlFor='PS5'
							className={styles['search__text5']}
						>
							PS5
						</label>
						<input
							{...register('XBOX')}
							type='checkbox'
							className={styles['search__check4']}
						/>
						<label
							htmlFor='XBOX'
							className={styles['search__text6']}
						>
							XBOX
						</label>
						<input
							{...register('Switch')}
							type='checkbox'
							className={styles['search__check5']}
						/>
						<label
							htmlFor='Switch'
							className={styles['search__text7']}
						>
							Switch
						</label>
					</fieldset>
					<div className={styles['search__filters']}>
						<button
							className={styles['search__button1']}
							onClick={applyFilters}
						>
							Confirm
						</button>
						<button
							className={styles['search__button2']}
							onClick={() => reset()}
						>
							Clear
						</button>
					</div>
				</div>
			)}
		</form>
	);
};

export default SearchBar;

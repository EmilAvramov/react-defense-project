const Err = ({ styles }) => {
	return (
		<div className={styles}>
			<i className='fa-solid fa-triangle-exclamation'></i>
			<div>
				Looks like an error occurred. Our support team has been
				notified.
			</div>
		</div>
	);
};

export default Err;

const Err = ({ styles }) => {
	return (
		<div className={styles}>
			<i class='fa-solid fa-triangle-exclamation'></i>
			<error>
				Looks like an error occurred. Our support team has been
				notified.
			</error>
		</div>
	);
};

export default Err;

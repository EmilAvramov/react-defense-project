import { useState } from 'react';
import GridLoader from 'react-spinners/GridLoader';

const Loader = ({loading, styles, size}) => {
    const [color] = useState('#333333');
	return (
		<GridLoader
			color={color}
			loading={loading}
			cssOverride={styles}
			size={size}
		/>
	);
};

export default Loader;
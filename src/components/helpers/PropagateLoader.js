import { useState } from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Loader = ({loading, styles, size}) => {
    const [color] = useState('#006400');
	return (
		<PropagateLoader
			color={color}
			loading={loading}
			cssOverride={styles}
			size={size}
		/>
	);
};

export default Loader;
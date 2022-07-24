import { useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';

const Loader = ({loading, styles, size}) => {
    const [color] = useState('#cae9ea');
	return (
		<RingLoader
			color={color}
			loading={loading}
			cssOverride={styles}
			size={size}
		/>
	);
};

export default Loader;
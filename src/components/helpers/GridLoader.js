import { useState } from 'react';
import { homeLoader } from '../../styles/auxilary/loaderStyles'
import GridLoader from 'react-spinners/GridLoader';

const Loader = (props) => {
    const [color] = useState('#333333');
	return (
		<GridLoader
			color={color}
			loading={props.loading}
			cssOverride={homeLoader}
			size={100}
		/>
	);
};

export default Loader;
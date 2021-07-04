import React from "react";
import Loader from "react-loader-spinner";

import { Center } from "@chakra-ui/layout";

const LoadingSpinner = (): JSX.Element => {
	return (
		<Center>
			<Loader type="TailSpin" color="#DB4C3F" height={100} width={100} />
		</Center>
	);
};

export default LoadingSpinner;

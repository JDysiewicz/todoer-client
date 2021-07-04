import React from "react";
import Loader from "react-loader-spinner";

const LoadingSpinner = (): JSX.Element => {
	return (
		<div>
			<Loader type="TailSpin" color="#DB4C3F" height={100} width={100} />
		</div>
	);
};

export default LoadingSpinner;

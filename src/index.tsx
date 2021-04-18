import React from "react";
import ReactDOM from "react-dom";

import AppRoutes from "./AppRoutes";
import ProviderWrapper from "./ProviderWrapper";

ReactDOM.render(
	<ProviderWrapper>
		<AppRoutes />
	</ProviderWrapper>,
	document.getElementById("root")
);

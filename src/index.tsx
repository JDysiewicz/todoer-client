import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./api/apollo";
import AppRoutes from "./AppRoutes";

ReactDOM.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<AppRoutes />
		</React.StrictMode>
	</ApolloProvider>,
	document.getElementById("root")
);

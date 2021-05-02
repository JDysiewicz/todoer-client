import React from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ChakraProvider, StylesProvider } from "@chakra-ui/react";
import { client } from "./api/apollo";

const ProviderWrapper = ({ children }: any) => {
	return (
		<ChakraProvider>
			<ApolloProvider client={client}>
				<React.StrictMode>{children}</React.StrictMode>
			</ApolloProvider>
		</ChakraProvider>
	);
};

export default ProviderWrapper;

import React, { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client/react";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from "./api/apollo";

const ProviderWrapper = ({
	children,
}: {
	children: ReactNode;
}): JSX.Element => {
	return (
		<ChakraProvider>
			<ApolloProvider client={client}>
				<React.StrictMode>{children}</React.StrictMode>
			</ApolloProvider>
		</ChakraProvider>
	);
};

export default ProviderWrapper;

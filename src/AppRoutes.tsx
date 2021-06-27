import { gql, useQuery } from "@apollo/client";
import { Grid, GridItem } from "@chakra-ui/layout";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/molecules/Header";
import Login from "./pages/LoginPage";
import NullComponent from "./pages/NullComponentPage";
import ProjectPage from "./pages/ProjectPage";
import SidePanel from "./components/organisms/SidePanel";
import UserContext from "./context/UserContext";
import { User } from "./types";
import Register from "./pages/RegisterPage";

const GET_CURRENT_USER = gql`
	query CurrentUser {
		currentUser {
			email
			id
			name
			role
		}
	}
`;

const AppRoutes = (): JSX.Element => {
	const [user, setUser] = useState<User | null>(null);
	const { loading } = useQuery(GET_CURRENT_USER, {
		onCompleted: (data) => {
			if (data && data.currentUser) setUser(data.currentUser);
		},
	});

	if (loading) return <div>Loading....</div>;

	return (
		<UserContext.Provider value={user}>
			<Router>
				<Switch>
					<Route path="/register" component={Register} />
					{!user && (
						<Route
							path="/"
							render={(props) => (
								<Login {...props} setUser={setUser} />
							)}
						/>
					)}
					{user && (
						<>
							<Header setUser={setUser} />
							<Grid templateColumns="20% 80%">
								<GridItem>
									<SidePanel />
								</GridItem>
								<GridItem>
									<Switch>
										<Route
											path="/project/:projectId"
											component={ProjectPage}
										/>

										<Route
											path="/"
											component={NullComponent}
										/>
									</Switch>
								</GridItem>
							</Grid>
						</>
					)}
				</Switch>
			</Router>
		</UserContext.Provider>
	);
};

export default AppRoutes;

import React from "react";

import ProjectPage from "./pages/ProjectPage";
import SidePanel from "./components/organisms/SidePanel";
import LoadingSpinner from "./components/atoms/LoadingSpinner";
import Header from "./components/molecules/Header";
import { Grid, GridItem } from "@chakra-ui/layout";

import { Route, Switch } from "react-router-dom";
import { User } from "./types";
import { ProjectsContext } from "./context/ProjectsContext";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "./graphql/queries";

interface AppProps {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const App: React.FC<AppProps> = ({ setUser }) => {
	const { data, refetch: refetchProjects, loading } = useQuery(GET_PROJECTS);

	if (loading) return <LoadingSpinner />;
	return (
		<ProjectsContext.Provider
			value={{ projects: data.projects, refetchProjects }}
		>
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
					</Switch>
				</GridItem>
			</Grid>
		</ProjectsContext.Provider>
	);
};

export default App;

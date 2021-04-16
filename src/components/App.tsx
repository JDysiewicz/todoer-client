import { gql, useQuery } from "@apollo/client";
import React from "react";

const PROJECTS = gql`
	query Projects {
		projects {
			color
			id
			name
			order
			todos {
				due
				id
				title
			}
		}
	}
`;

const App: React.FC = (): JSX.Element => {
	const { loading, data } = useQuery(PROJECTS);

	const renderProjects = () => {
		if (!data) return null;
		return data.projects.map((project: any) => {
			return (
				<li key={project.id}>
					<h2>{project.name}</h2>
				</li>
			);
		});
	};

	return (
		<div>
			<h1>Projects</h1>
			{loading && <div>Loading projects...</div>}
			<ul>{renderProjects()}</ul>
		</div>
	);
};

export default App;

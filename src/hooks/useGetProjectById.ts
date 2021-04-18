import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_PROJECT } from "../graphql/queries";
import { Project } from "../types";

export const useGetProjectById = (projectId: string) => {
	const [project, setProject] = useState<Project>();
	const [getProject, { data, loading, error }] = useLazyQuery(GET_PROJECT);

	useEffect(() => {
		if (projectId.match(/^\d+$/)) {
			getProject({ variables: { projectId } });
			if (!loading && data) setProject(data.project);
		}
	}, [projectId, loading, data]);

	return { project, loading, error };
};

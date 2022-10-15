import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state";
import ProjectDetail from "./ProjectDetail";
import { cleanProject, findProject } from "./state/projectActions";
import { ProjectState } from "./state/projectTypes";

export default function ProjectPage(): JSX.Element {
	const params = useParams();
	const id = Number(params.id);

	const loading = useSelector((state: AppState) => state.projectState.loading);
	const error = useSelector((state: AppState) => state.projectState.error);
	const project = useSelector((state: AppState) => state.projectState.project);

	const dispatch = useDispatch<ThunkDispatch<ProjectState, null, AnyAction>>();

	useEffect(() => {
		dispatch(findProject(id));

		return () => {
			dispatch(cleanProject());
		};
	}, [dispatch, id]);

	return (
		<div>
			<h1>Project Detail</h1>

			{loading && (
				<div className="center-page">
					<span className="spinner primary"></span>
					<p>Loading...</p>
				</div>
			)}

			{error && (
				<div className="row">
					<div className="card large error">
						<section>
							<p>
								<span className="icon-alert inverse"></span>
								{error}
							</p>
						</section>
					</div>
				</div>
			)}

			{project && <ProjectDetail project={project} />}
		</div>
	);
}

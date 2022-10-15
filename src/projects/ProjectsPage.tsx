import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../state";
import ProjectList from "./ProjectList";
import { loadProjects } from "./state/projectActions";
import { ProjectState } from "./state/projectTypes";

function ProjectsPage(): JSX.Element {
	const loading = useSelector((state: AppState) => state.projectState.loading);

	const projects = useSelector((state: AppState) => state.projectState.projects);

	const error = useSelector((state: AppState) => state.projectState.error);

	const currentPage = useSelector((state: AppState) => state.projectState.page);

	const dispatch = useDispatch<ThunkDispatch<ProjectState, null, AnyAction>>();

	useEffect(() => {
		dispatch(loadProjects(1));
	}, [dispatch]);

	const handleMoreClick = () => {
		dispatch(loadProjects(currentPage + 1));
	};

	return (
		<>
			<h1>Projects</h1>
			{error && (
				<div className="row">
					<div className="card large error">
						<section>
							<p>
								<span className="icon-alert inverse "></span>
								{error}
							</p>
						</section>
					</div>
				</div>
			)}

			<ProjectList projects={projects} />

			{!loading && !error && (
				<div className="row">
					<div className="col-sm-12">
						<div className="button-group fluid">
							<button className="button default" onClick={handleMoreClick}>
								More...
							</button>
						</div>
					</div>
				</div>
			)}
			{loading && (
				<div className="center-page">
					<span className="spinner primary"></span>
					<p>Loading...</p>
				</div>
			)}
		</>
	);
}

export default ProjectsPage;

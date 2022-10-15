import { Project, ProjectArgs } from "./Project";
const baseUrl = "http://192.168.0.205:4201";
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number): string {
	switch (status) {
		case 401:
			return "Please login again";
		case 403:
			return "You do not have permission to view the project(s).";
		default:
			return "There was an error retrieving the project(s). Please try again.";
	}
}

function checkStatus(response: Response): Response {
	if (response.ok) {
		return response;
	}

	const httpErrorInfo = {
		status: response.status,
		statusText: response.statusText,
		url: response.url,
	};

	console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

	const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);

	throw new Error(errorMessage);
}

function parseJSON<T>(response: Response): Promise<T> {
	return response.json();
}

function delay(ms: number): (x: Response) => Promise<Response> {
	return function (x: Response): Promise<Response> {
		return new Promise((resolve) => setTimeout(() => resolve(x), ms));
	};
}

function convertToProjectModel(item: unknown): Project {
	return new Project(item as ProjectArgs);
}

function convertToProjectModels(data: unknown): Project[] {
	const projects: Project[] = (data as ProjectArgs[]).map(convertToProjectModel);
	return projects;
}

const projectAPI = {
	get(page = 1, limit = 14): Promise<Project[]> {
		return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
			.then(delay(600))
			.then(checkStatus)
			.then(parseJSON)
			.then(convertToProjectModels)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error("There was an error retrieving the projects. Please try again.");
			});
	},
	put(project: Project): Promise<Project> {
		return fetch(`${url}/${project.id}`, {
			method: "PUT",
			body: JSON.stringify(project),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(delay(600))
			.then(checkStatus)
			.then(parseJSON)
			.then(convertToProjectModel)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error("There was an error updating the project. Please try again.");
			});
	},
	find(id: number): Promise<Project> {
		return fetch(`${url}/${id}`)
			.then(delay(600))
			.then(checkStatus)
			.then(parseJSON)
			.then(convertToProjectModel)
			.catch((error: TypeError) => {
				console.log("log client error " + error);
				throw new Error(`There was an error retrieving the project with id ${id}. Please try again.`);
			});
	},
};

export { projectAPI };

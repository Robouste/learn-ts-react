import { ChangeEvent, SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Project } from "./Project";
import { saveProject } from "./state/projectActions";
import { ProjectState } from "./state/projectTypes";

interface ProjectFormProps {
	project: Project;
	onCancel: () => void;
}

interface FormErrors {
	name: string;
	description: string;
	budget: string;
}

function ProjectForm({ project: initialProject, onCancel }: ProjectFormProps): JSX.Element {
	const [project, setProject] = useState(initialProject);
	const [errors, setErrors] = useState<FormErrors>({
		name: "",
		description: "",
		budget: "",
	});

	const dispatch = useDispatch<ThunkDispatch<ProjectState, null, AnyAction>>();

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();

		if (!isValid()) {
			return;
		}

		dispatch(saveProject(project));
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { type, name, value } = event.target;

		let updatedValue: string | boolean | number =
			type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

		if (type === "number") {
			updatedValue = Number(updatedValue);
		}

		const change = {
			[name]: updatedValue,
		};

		let updatedProject: Project;

		setProject((p) => {
			updatedProject = new Project({ ...p, ...change });
			return updatedProject;
		});

		setErrors(() => validate(updatedProject));
	};

	function validate(project: Project): FormErrors {
		let errors: FormErrors = { name: "", description: "", budget: "" };

		if (project.name.trim().length === 0) {
			errors.name = "Name is required";
		}

		if (project.description.trim().length === 0) {
			errors.description = "Description is required";
		}

		if (project.budget <= 0) {
			errors.budget = "Budget most be more than 0€";
		}

		return errors;
	}

	function isValid() {
		return Object.values(errors).every((value) => !value);
	}

	return (
		<form className="input-group vertical" onSubmit={handleSubmit}>
			<label htmlFor="name">Project Name</label>
			<input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
			{errors.name.length > 0 && (
				<div className="card error">
					<p>{errors.name}</p>
				</div>
			)}
			<label htmlFor="description">Project Description</label>
			<textarea
				name="description"
				placeholder="enter description"
				value={project.description}
				onChange={handleChange}
			/>
			{errors.description.length > 0 && (
				<div className="card error">
					<p>{errors.description}</p>
				</div>
			)}
			<label htmlFor="budget">Project Budget</label>
			<input
				type="number"
				name="budget"
				placeholder="enter budget"
				value={project.budget}
				onChange={handleChange}
			/>
			{errors.budget.length > 0 && (
				<div className="card error">
					<p>{errors.budget}</p>
				</div>
			)}
			<label htmlFor="isActive">Active?</label>
			<input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
			<div className="input-group">
				<button className="primary bordered medium">Save</button>
				<span />
				<button type="button" className="bordered medium" onClick={onCancel}>
					cancel
				</button>
			</div>
		</form>
	);
}

export default ProjectForm;

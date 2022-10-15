export interface ProjectArgs {
	id?: number | undefined;
	name: string;
	description?: string;
	imageUrl?: string;
	contractTypeId?: number | undefined;
	contractSignedOn?: Date | string;
	budget?: number;
	isActive?: boolean;
}

export class Project {
	public id: number | undefined;
	public name: string = "";
	public description: string = "";
	public imageUrl: string = "";
	public contractTypeId: number | undefined;
	public contractSignedOn: Date = new Date();
	public budget: number = 0;
	public isActive: boolean = false;
	public get isNew(): boolean {
		return this.id === undefined;
	}

	constructor(initializer?: ProjectArgs) {
		if (!initializer) {
			return;
		}

		this.id = initializer.id ?? undefined;
		this.name = initializer.name ?? "";
		this.description = initializer.description ?? "";
		this.imageUrl = initializer.imageUrl ?? "";
		this.contractTypeId = initializer.contractTypeId;
		this.contractSignedOn = initializer.contractSignedOn ? new Date(initializer.contractSignedOn) : new Date();
		this.budget = initializer.budget ?? 0;
		this.isActive = !!initializer.isActive;
	}
}

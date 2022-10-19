import type { AnyKeys, FilterQuery, Model, UpdateQuery } from "mongoose"

export default class MongooseLib<T> implements IDbLib {
	model;
	constructor(model: Model<T>) {
		this.model = model;
	}

	get() {
		return this.model.find();
	}

	getById(id: string) {
		return this.model.findById(id);
	}

	getOne(query: FilterQuery<T>) {
		return this.model.findOne(query)
	}

	create(data: AnyKeys<T>) {
		const newDocument = new this.model(data);
		return newDocument.save();
	}

	update(id: string, data: UpdateQuery<T>) {
		return this.model.findByIdAndUpdate(id, data, { runValidators: true, new: true });
	}

	delete(id: string) {
		return this.model.findByIdAndRemove(id);
	}
};

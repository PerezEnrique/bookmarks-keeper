import IdbLibrary from "../utils/interfaces/IdbLibrary";

export default class MongooseLib implements IdbLibrary {
	constructor(model) {
		this.model = model;
	}

	get() {
		return this.model.find(query);
	}

	getOne(query: string) {
		return this.model.findOne(query)
	}

	getById(id: string) {
		return this.model.findById(id);
	}

	getOneByQuery(query) {
		return this.model.findOne(query);
	}

	create(data) {
		const newUser = new this.model(data);
		return newUser.save();
	}

	update(id, data) {
		return this.model.findByIdAndUpdate(id, data, { runValidators: true, new: true });
	}

	delete(id) {
		return this.model.findByIdAndRemove(id);
	}
};

module.exports = class MongooseLib {
	constructor(model) {
		this.model = model;
	}

	getAll(query = {}) {
		return this.model.find(query);
	}

	getById(id) {
		return this.model.findById(id);
	}

	getByQuery(query) {
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

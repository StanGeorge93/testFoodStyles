export default class BaseRepository {
  constructor(model) {
    this.model = model
  }

  async getAll() {
    try {
      return await this.model.find()
    } catch (error) {
      throw error
    }
  }

  async getById(id) {
    try {
      return await this.model.findOne({id})
    } catch (error) {
      throw error
    }
  }

  async getOneByArgs(...args) {
    try {
      return await this.model.find({where: {...args}})
    } catch (error) {
      throw error
    }
  }

  async getByArgs(...args) {
    try {
      return await this.model.find({...args})
    } catch (error) {
      throw error
    }
  }

  async create(...args) {
    try {
      return await this.model.create({...args})
    } catch (error) {
      throw error
    }
  }
}

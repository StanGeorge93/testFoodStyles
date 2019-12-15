import BaseRepository from "./base.repository";
import db from "../../models";

class UserRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async update(entity, {...newData}) {
    try {
      return await entity.update(newData)
    } catch (error) {
      throw error;
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({where: {
          email: email
        }})
    } catch (error) {
      throw error
    }
  }
}

export default new UserRepository(db.User)

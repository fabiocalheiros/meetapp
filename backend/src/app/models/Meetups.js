import Sequelize, { Model } from 'sequelize';

class Meetups extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        location: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
        banner_id: Sequelize.INTEGER,
        date_event: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Meetups;

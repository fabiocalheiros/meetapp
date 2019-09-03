import Meetup from '../models/Meetups';

class OrganizerController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: ['date_event'],
      limit: 20,
    });

    return res.json(meetups);
  }
}

export default new OrganizerController();

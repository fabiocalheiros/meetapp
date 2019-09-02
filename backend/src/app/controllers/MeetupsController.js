import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Meetup from '../models/Meetups';

class MeetupsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date_event: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation fails' });
    }

    const { title, description, location, date_event, banner_id } = req.body;

    // startOfHour = pega somente o inicio de um horario - ex: (19:30) so pega (19:00)
    // paserISO = transforma uma string em um objeto date em javascript
    const hourStart = startOfHour(parseISO(date_event));

    // verifica de a data atual já passou;
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const new_meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      location,
      date_event,
      banner_id,
    });

    return res.json(new_meetup);
  }
}

export default new MeetupsController();

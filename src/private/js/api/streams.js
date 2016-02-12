import { Router } from 'express';
import {addTwitterSearch} from './TwitterStream';

const services = {
  twitterSearch: (query, cb) => {
    addTwitterSearch(query, cb);
  }
};

const serviceExists = (serviceName) => {
  return !!services[serviceName];
};

const router = new Router();

router.get('/', (req, res, next) => {
  try {
    const service = req.query.service;

    if (!service || service === 'undefined') {
      res.status(400).send({error: `The 'service' query parameter cannot be empty.`});
      return;
    }

    if (!serviceExists(service)) {
      res.status(404).send({error: `The service '${service}' is not supported.`});
    } else {
      services[service]("nodejs", (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
      });
    }
  } catch (err) {
    next(err);
  }
});

export default router;

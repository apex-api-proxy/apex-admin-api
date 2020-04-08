var express = require('express');
var router = express.Router();

const redis = require('redis');
const PORT = process.env.REDIS_PORT;
const HOST = process.env.REDIS_IP;

const client = redis.createClient(PORT, HOST);
const connection = new Promise((resolve, reject) => {
  const client = redis.createClient(PORT, HOST);

  client.on('connect', () => {
    resolve(client);
  });

  client.on('error', (err) => {
    console.log('An error occurred while connecting to the config store:');
    console.error(err);
    console.log('\n');
  });
})

// GET all service hosts
router.get('/', function(req, res, next) {
  connection.then((client) => {
    client.hgetall('service-hosts', (err, services) => {
    	res.send(services);
    });
  })
  .catch(e => console.log('An error occurred: ', e));
});

// GET config for requesting/responding service combination
router.get('/:reqService/:resService', function(req, res, next) {
	connection.then((client) => {
    client.hgetall(`${req.params["reqService"]}:${req.params["resService"]}`, (err, config) => {
      res.send(config);
    });
  })
  .catch(e => console.log('An error occurred: ', e));
});

// POST config for requesting/responding service combination
router.post('/:reqService/:resService', function(req, res, next) {
	connection.then((client) => {
		const redisKey = `${req.params["reqService"]}:${req.params["resService"]}`;
		const args = [];

		for (key in req.body) {
			args.push(key);
			args.push(req.body[key]);
		}

    client.hmset(redisKey, args, (err, res) => {
      res.send(res);
    });
  })
  .catch(e => console.log('An error occurred: ', e));
});

module.exports = router;

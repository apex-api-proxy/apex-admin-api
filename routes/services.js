var express = require('express');
var router = express.Router();
const redis = require('redis');
const PORT = process.env.REDIS_PORT;
const HOST = process.env.REDIS_IP;
const client = redis.createClient(PORT, HOST);

/* GET home page. */
router.get('/services', function(req, res, next) {
	new Promise((resolve, reject) => {
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
  .then((client) => {
    client.hgetall('service-hosts', (err, services) => {
    	res.send(services);
    });
  })
  .catch(e => console.log('An error occurred: ', e));
});

// router.get('/:service', function(req, res, next) {
// 	new Promise((resolve, reject) => {
//     const client = redis.createClient(PORT, HOST);

//     client.on('connect', () => {
//       resolve(client);
//     });

//     client.on('error', (err) => {
//       console.log('An error occurred while connecting to the config store:');
//       console.error(err);
//       console.log('\n');
//     });
//   })
//   .then((client) => {
//     client.get(req.params["service"], (err, config) => {
//       if (config === null) {
//         client.hgetall('default:default', (err, defaultConfig) => {
//           outgoingResponse.locals.config = defaultConfig;
//           next();
//         });
//       } else {
//         outgoingResponse.locals.config = config;
//         next();
//       }
//     });
//   })
//   .catch(e => console.log('An error occurred: ', e));
// });

module.exports = router;

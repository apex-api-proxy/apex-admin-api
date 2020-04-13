const express = require('express');
const router = express.Router();
const { Client } = require('pg');
const client = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
})

const text = 'SELECT * FROM apex_logs WHERE correlation_id = $1';

// GET logs by correlation ID
router.get('/:correlation_id', function(req, res, next) {
	client.connect();

	client.query(text, [req.params["correlation_id"]], (err, logsResponse) => {
		console.log('Inside logs query callback');
		console.log('correlation_id: ', req.params["correlation_id"]);
		console.log('logsResponse: ', logsResponse);
	  client.end();

	  if (logsResponse) {
	  	res.send(logsResponse.rows);
	  } else {
	  	res.send({});
	  }
	});
});

module.exports = router;

// correlation_id: 9eb41e30-81ad-4357-b3a7-e6b060cbd8de
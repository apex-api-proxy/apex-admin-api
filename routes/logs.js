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
	  client.end();

	  if (logsResponse) {
	  	res.send(logsResponse.rows);
	  } else {
	  	res.send({});
	  }
	});
});

module.exports = router;
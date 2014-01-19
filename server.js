var recent = [];
var index = {};

var crypto = require('crypto');
var express = require('express');
var cors = require('cors');

var app = express()
  .disable('etag')
  .use(express.logger('dev'))
  .use(cors())
  .use(express.static(__dirname + '/public'));

app.get('/recent', list);
app.post('/',
   express.json({ strict: false }),
   express.urlencoded(),
   create);
app.get('/:id', redirect);

function list(req, res) {
  res.send(recent);
}

function create(req, res) {
  var url = req.body.url;
  if (! url)
    return res.send(400, 'Need a url.');

  var id = shorten(url);
  var entry = index[id] || { id: id, url: url, count: 0 };

  var i;
  for (i = 0; i < recent.length; ++i)
    if (recent[i].id === id)
      break;

  recent.splice(i, 1);

  index[id] = entry;
  recent.unshift(entry);
  if (recent.length > 10)
    recent.pop();

  res.send(id);
}

function shorten(url) {
  return crypto
    .createHash('sha1')
    .update(url)
    .digest('base64')
    .replace(/[=+/]/g, '')
    .slice(0, 6);
}

function redirect(req, res, next) {
  var id = req.params.id;
  var entry = index[id];

  if (! entry)
    return next();

  entry.count++;
  res.redirect(entry.url);
}

app.listen(process.env.PORT || 8000);


const express = require('express');
const url = require('url');
const fs = require('fs');
const app = express();
const getId = (function () {
  let prev = 0;
  return function (query) {
    if (query) {
      if (query.after) {
        prev = +query.after;
        if (prev < 0) prev = 0;
        if (prev >= 8) prev = 0;
        else prev += 1;
        return prev;
      }
      if (query.before) {
        prev = +query.before;
        if (prev > 8) prev = 8;
        if (prev <= 0) prev = 8;
        else prev -= 1;
        return prev;
      }
    }
    return 0;
  }
})();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/assets/js/index.html');
});

app.get('/api/media', function (req, res) {
  const query = url.parse(req.url, true).query;
  const id = getId(query);
  setTimeout(() => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send({
      id: id,
      type: 1,
      link: `http://localhost:8080/media/media${id}.jpg`,
      title: `This is an imange number ${id} from the library`,
      description: `Here is an example of a simple “Hello World” Express application. 
    The remainder of this article will define and add two middleware functions 
    to the application: one called myLogger that prints a simple
     log message and another called requestTime that displays the timestamp of the HTTP request.`,
      tags: [
        'movie', 'helloworld', 'yeatnoath', 'hahahayouare dummy coder'
      ]
    });
  }, 1000);
});

app.use(express.static('assets'));

app.listen(8080, function () {
  console.log('Running server..');
});


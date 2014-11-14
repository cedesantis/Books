'use strict';

// The Package is past automatically as first parameter
module.exports = function(Books, app, auth, database) {

  app.get('/books/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/books/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/books/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/books/example/render', function(req, res, next) {
    Books.render('index', {
      package: 'books'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

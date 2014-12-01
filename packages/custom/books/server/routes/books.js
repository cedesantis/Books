'use strict';

var books = require('../controllers/books');

var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.book.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};


module.exports = function(Books, app, auth) {

  app.route('/books')
      .get(books.all)
      .post(auth.requiresLogin, books.create);
  app.route('/books/:bookId')
      .get(books.show)
      .put(auth.requiresLogin, hasAuthorization, books.update)
      .delete(auth.requiresLogin, hasAuthorization, books.destroy);

  // Finish with setting up the articleId param
  app.param('bookId', books.book);
};

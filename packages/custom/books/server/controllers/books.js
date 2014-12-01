'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Book = mongoose.model('Book'),
    _ = require('lodash');


/**
 * Find book by id
 */
exports.book = function(req, res, next, id) {
    Book.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load book ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create an article
 */
exports.create = function(req, res) {
    var book = new Book(req.body);
    book.user = req.user;

    book.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot save the article'
            });
        }
        res.json(book);

    });
};

/**
 * Update an article
 */
exports.update = function(req, res) {
    var book = req.book;

    book = _.extend(book, req.body);

    book.save(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot update the article'
            });
        }
        res.json(book);

    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var book = req.book;

    book.remove(function(err) {
        if (err) {
            return res.json(500, {
                error: 'Cannot delete the article'
            });
        }
        res.json(book);

    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.json(req.book);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Book.find().sort('-created').populate('user', 'name username').exec(function(err, books) {
        if (err) {
            return res.json(500, {
                error: 'Cannot list the articles'
            });
        }
        res.json(books);

    });
};

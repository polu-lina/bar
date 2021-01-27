var Dish = require('../models/dish');
var Show = require('../models/show');
var Table = require('../models/table');

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        dish_count: function(callback) {
            Dish.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        show_count: function(callback) {
            Show.countDocuments({}, callback);
        },
        table_count: function(callback) {
            Table.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: 'Bar', error: err, data: results });
    });
};

// Display list of all Dishes.
exports.dish_list = function(req, res, next) {
    Dish.find({}, 'name')
    .exec(function (err, list_dishes) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('dish_list', { title: 'Меню', dish_list: list_dishes });
    });
};

// Display detail page for a specific Dish.
exports.dish_detail = function(req, res) {
    Dish.findById(req.params.id)
    .exec(function (err, dish) {
      if (err) { return next(err); }
      if (dish==null) { // No results.
            var err = new Error('Блюдо не найдено');
            err.status = 404;
            return next(err);
        }
      //Successful, so render
      res.render('dish_detail', { title: dish.name, dish: dish });
    });
};

// Display Dish create form on GET.
exports.dish_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish create GET');
};

// Handle Dish create on POST.
exports.dish_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish create POST');
};

// Display Dish delete form on GET.
exports.dish_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish delete GET');
};

// Handle Dish delete on POST.
exports.dish_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish delete POST');
};

// Display Dish update form on GET.
exports.dish_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish update GET');
};

// Handle Dish update on POST.
exports.dish_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Dish update POST');
};
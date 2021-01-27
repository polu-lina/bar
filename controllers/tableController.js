var Table = require('../models/table');
const { body,validationResult } = require("express-validator");

// Display list of all tables.
exports.table_list = function(req, res) {
    Table.find()
    .where('booked_dates').ne(Date.now())
    .exec(function (err, list_tables) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('table_list', { title: 'Свободные столы на сегодня', table_list: list_tables });
    });
};

// Display detail page for a specific table.
exports.table_detail = function(req, res, next) {
    Table.findById(req.params.id)
    .exec(function (err, table) {
      if (err) { return next(err); }
      if (table==null) { // No results.
            var err = new Error('Стол не найден');
            err.status = 404;
            return next(err);
        }
      //Successful, so render
      res.render('table_detail', { title: 'Забронировать стол', table: table });
    });
};

// // Display table create form on GET.
// exports.table_create_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Table create GET');
// };

// // Handle table create on POST.
// exports.table_create_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Table create POST');
// };

// // Display table delete form on GET.
// exports.table_delete_get = function(req, res) {
//     res.send('NOT IMPLEMENTED: Table delete GET');
// };

// // Handle table delete on POST.
// exports.table_delete_post = function(req, res) {
//     res.send('NOT IMPLEMENTED: Table delete POST');
// };

// Display table update form on GET.
exports.table_update_get = function(req, res, next) {

    // Get book, authors and genres for form.
    Table.findById(req.params.id)
      .exec(function (err, table) {
        if (err) { return next(err); }
        if (table==null) { // No results.
            var err = new Error('Стол не найден');
            err.status = 404;
            return next(err);
        }
        //Success
        res.render('table_form', { title: 'Бронирование стола', table: table });
    });

};

// Handle table update on POST.
exports.table_update_post = [

    // Validate and sanitise fields.
    body('date', 'Выберите дату бронирования').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('name', 'Укажите ваше имя').trim().isLength({ min: 1 }).escape(),
    body('phone', 'Укажите номер телефона').trim().isLength({min: 1}).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                table: function(callback) {
                    Table.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                //Success
                new_table = results;
                res.render('table_form', { title: 'Забронировать столик',number: results.number, booked_date: results.booked_date, name: name, errors: errors.array() });
            });
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Table.findById(req.params.id).exec(function (err,thebook) {
                if (err) { return next(err); }
                   // Successful - redirect to book detail page.
                   res.render('success_booking', { title: 'Бронирование',number: req.body.number, booked_date: req.body.booked_date, name: req.body.name});
                });
        }
    }
];
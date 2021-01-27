var Show = require('../models/show');

// Display list of all Shows.
exports.show_list = function(req, res, next) {
	Show.find({}, 'title start_date end_date')
	.exec(function (err, list_shows) {
		if (err) { return next(err); }
		res.render('show_list', { title: 'Список мероприятий', show_list: list_shows});
	}); 
};

// Display detail page for a specific Show.
exports.show_detail = function(req, res, next) {
    Show.findById(req.params.id)
    .exec(function (err, show) {
      if (err) { return next(err); }
      if (show==null) { // No results.
            var err = new Error('Мероприятие не найдено');
            err.status = 404;
            return next(err);
        }
      //Successful, so render
      res.render('show_detail', { title: show.title, show: show });
    });
};

// Display Show create form on GET.
exports.show_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Show create GET');
};

// Handle Show create on POST.
exports.show_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Show create POST');
};

// Display Show delete form on GET.
exports.show_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Show delete GET');
};

// Handle Show delete on POST.
exports.show_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Show delete POST');
};

// Display Show update form on GET.
exports.show_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Show update GET');
};

// Handle Show update on POST.
exports.show_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Show update POST');
};
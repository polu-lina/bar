var express = require('express');
var router = express.Router();

// Require controller modules.
var dish_controller = require('../controllers/dishController');
var show_controller = require('../controllers/showController');
var table_controller = require('../controllers/tableController');

/// dish ROUTES ///

// GET catalog home page.
router.get('/', dish_controller.index);

// // GET request for creating a dish. NOTE This must come before routes that display dish (uses id).
// router.get('/dish/create', dish_controller.dish_create_get);

// // POST request for creating dish.
// router.post('/dish/create', dish_controller.dish_create_post);

// // GET request to delete dish.
// router.get('/dish/:id/delete', dish_controller.dish_delete_get);

// // POST request to delete dish.
// router.post('/dish/:id/delete', dish_controller.dish_delete_post);

// // GET request to update dish.
// router.get('/dish/:id/update', dish_controller.dish_update_get);

// // POST request to update dish.
// router.post('/dish/:id/update', dish_controller.dish_update_post);

// GET request for one dish.
router.get('/dish/:id', dish_controller.dish_detail);

// GET request for list of all dish items.
router.get('/dishes', dish_controller.dish_list);

/// show ROUTES ///

// // GET request for creating show. NOTE This must come before route for id (i.e. display show).
// router.get('/show/create', show_controller.show_create_get);

// // POST request for creating show.
// router.post('/show/create', show_controller.show_create_post);

// // GET request to delete show.
// router.get('/show/:id/delete', show_controller.show_delete_get);

// // POST request to delete show.
// router.post('/show/:id/delete', show_controller.show_delete_post);

// // GET request to update show.
// router.get('/show/:id/update', show_controller.show_update_get);

// // POST request to update show.
// router.post('/show/:id/update', show_controller.show_update_post);

// GET request for one show.
router.get('/show/:id', show_controller.show_detail);

// GET request for list of all shows.
router.get('/shows', show_controller.show_list);

/// table ROUTES ///

// // GET request for creating a table. NOTE This must come before route that displays table (uses id).
// router.get('/table/create', table_controller.table_create_get);

// //POST request for creating table.
// router.post('/table/create', table_controller.table_create_post);

// // GET request to delete table.
// router.get('/table/:id/delete', table_controller.table_delete_get);

// // POST request to delete table.
// router.post('/table/:id/delete', table_controller.table_delete_post);

// GET request to update table.
router.get('/table/:id', table_controller.table_update_get);

// POST request to update table.
router.post('/table/:id', table_controller.table_update_post);

/*// GET request for one table.
router.get('/table/:id', table_controller.table_detail);*/

// GET request for list of all table.
router.get('/tables', table_controller.table_list);

module.exports = router;
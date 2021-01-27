#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Dish = require('./models/dish')
var Show = require('./models/show')
var Table = require('./models/table')


var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://dbUser:dbUserPassword@cluster0.wxggp.mongodb.net/bar?retryWrites=true&w=majority';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var dishes = []
var shows = []
var tables = []

function dishCreate(name, description, weight, price, cb) {
  dishdetail = {name:name , 
    weight: weight ,
    description: description,
    price: price}
  
  var dish = new Dish(dishdetail);
       
  dish.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Dish: ' + dish);
    dishes.push(dish)
    cb(null, dish)
  }  );
}

function showCreate(title, description, start_date, end_date, cb) {
  var show = new Show({ title: title,
    description: description,
    start_date: start_date,
    end_date: end_date});
       
  show.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Show: ' + show);
    shows.push(show)
    cb(null, show);
  }   );
}

function tableCreate(capacity, number, cb) {
  tabledetail = { 
    capacity: capacity,
    number: number
  }
    
  var table = new Table(tabledetail);    
  table.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New table: ' + table);
    tables.push(table)
    cb(null, table)
  }  );
}


function createDishes(cb) {
    async.series([
        function(callback) {
          dishCreate('Большая порция свиных ребер в соусе Pepper с молодым картофелем', 
            'Свиные ребра в пряном соусе пеппер, молодой картофель, кинза, перец чили',
            580, 690, callback);
        },
        function(callback) {
          dishCreate('Овощи по сезону, запеченные на гриле, со свежими травами', 
            'Обжаренные на гриле со специями и ароматным маслом баклажаны, цукини, перец сладкий, лук красный, шампиньоны. Подаются с розовым перцем, гималайской солью и кресс салатом', 
            170, 250, callback);
        },
        function(callback) {
          dishCreate('Чизкейк Нью-Йорк', 
            'Чизкейк Нью-Йорк с соусом манго и миндальным крамблом', 
            200, 290, callback);
        }
        ],
        // optional callback
        cb);
}


function createShows(cb) {
    async.parallel([
        function(callback) {
          showCreate('Джазовый вечер', 
            'Лучшие музыканты Екатеринбурга подарят Вам неповторимый вечер, окутанный изящными мелодиями и романтичными мотивами', 
            '2021-02-11T18:00:00.000Z','2021-02-11T22:00:00.000Z', callback);
        }
        ],
        // optional callback
        cb);
}


function createTable(cb) {
    async.parallel([
        function(callback) {
          tableCreate(2, 1, callback)
        },
        function(callback) {
          tableCreate(2, 2, callback)
        },
        function(callback) {
          tableCreate(2, 3, callback)
        },
        function(callback) {
          tableCreate(2, 4, callback)
        },
        function(callback) {
          tableCreate(4, 5, callback)
        },
        function(callback) {
          tableCreate(4, 6, callback)
        },
        function(callback) {
          tableCreate(4, 7, callback)
        },
        function(callback) {
          tableCreate(4, 8, callback)
        },
        function(callback) {
          tableCreate(8, 9, callback)
        },
        function(callback) {
          tableCreate(8, 10, callback)
        },
        function(callback) {
          tableCreate(8, 11, callback)
        },
        function(callback) {
          tableCreate(8, 12, callback)
        },
        function(callback) {
          tableCreate(10, 13, callback)
        },
        function(callback) {
          tableCreate(10, 14, callback)
        },
        function(callback) {
          tableCreate(10, 15, callback)
        },
        function(callback) {
          tableCreate(10, 16, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    createDishes,
    createShows,
    createTable
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('YEEEEEAH');
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});





var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DishSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    weight: {type: Number, required: true},
    price: {type: Number, required: true}
  }
);

// Virtual for dishes URL
DishSchema
.virtual('url')
.get(function () {
  return '/catalog/dish/' + this._id;
});

//Export model
module.exports = mongoose.model('Dish', DishSchema);
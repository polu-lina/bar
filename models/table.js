var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
  {
    capacity: { type: Number, required: true },
    number: {type: Number, required: true},
    booked_dates: {type: [Date], default: []}
  }
);

// Virtual for Table's URL
TableSchema
.virtual('url')
.get(function () {
  return '/catalog/table/' + this._id;
});

//Export model
module.exports = mongoose.model('Table', TableSchema);
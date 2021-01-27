const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ShowSchema = new Schema(
  {
  	title: {type: String, required: true, maxlength: 300},
    description: {type: String, maxlength: 10000},
    start_date: {type: Date},
    end_date: {type: Date}
  }
);

// Virtual for show's name
ShowSchema
.virtual('name')
.get(function () {
  return this.title + ', ' + this.start_date.toString();
});

// Virtual for author's URL
ShowSchema
.virtual('url')
.get(function () {
  return '/catalog/show/' + this._id;
});

ShowSchema
.virtual('start_date_formatted')
.get(function () {
  return DateTime.fromJSDate(this.start_date).toLocaleString(DateTime.DATE_MED);
});

ShowSchema
.virtual('end_date_formatted')
.get(function () {
  return DateTime.fromJSDate(this.end_date).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model('Show', ShowSchema);
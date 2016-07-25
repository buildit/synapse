const fillMissingCategories = require('./fillMissingCategories');
const fillGapsInDemandDataSeries = require('./fillGapsInDemandDataSeries');
const sortDemandData = require('./sortDemandData');
const transformDefectData = require('./transformDefectData');


const norm = function norm() {
  function my() {
  }

  my.datum = function datum(d) {
    if (d === undefined) {
      return this.data;
    }

    this.data = d;
    return my;
  };

  my.fill = function fill() {
    fillMissingCategories(this.data);
    return my;
  };

  my.sort = function sort() {
    sortDemandData(this.data);
    return my;
  };

  my.log = function log() {
    this.data.forEach(item => {
      console.log(item);
    });
    return my;
  };

  my.getData = function getData() {
    return this.data;
  };

  my.transform = function transform() {
    this.data = transformDefectData(this.data);
    return my;
  };

  my.fillGapsInDataSeries = function fillGapsInDataSeries() {
    return my;
  };

  return my;
};

module.exports = norm;

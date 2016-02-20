(function() {
  "use strict";

  angular.module('reedsyApp')
    .filter('relativeDateFilter', relativeDateFilter);

  function relativeDateFilter() {
    // display publish date, relative to today's date
    return relativeDate;

    function relativeDate(date) {
      var today = new Date();
      var diff = parseInt((today.getTime() - new Date(date).getTime()) / 1000 / 60 / 60 / 24);
      var unit = diff > 1 ? "days" : "day";
      // change units to year(s) if more than 365 days ago
      if (diff > 365) {
        diff = parseInt(diff / 365);
        unit = diff > 1 ? "years" : "year";
      }
      return diff + " " + unit + " ago";
    }
  }

})();

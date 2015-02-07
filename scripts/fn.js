/* jslint browser: true */

(function(fn) {
  'use strict';


  // Returns first element in an array.
  fn.first = fn.head = function(arr) {
    return arr[0];
  };

  // Returns last element in an array.
  fn.last = function(arr) {
    return arr[arr.length-1];
  };

  fn.reduce = fn.foldl = function(arr, callback, initial) {
    if (arr.length < 1) { return undefined; }
    var acc = initial || arr[0];
    var i = initial === undefined ? 1 : 0;
    for (; i < arr.length; i++) {
      acc = callback(acc, arr[i], i, arr);
    }
    return acc;
  };

  // Removes the nth element from the array -- 0 based
  // returns an array with the removed element
  // and the new array sans element
  fn.removeAt = function(arr, position) {
    var elm  = arr[position];
    var list = Array.prototype.concat(arr.slice(0, position));
    list = list.concat(arr.slice(position+1, arr.length));
    return [elm, list];
  };

  fn.tail = function(arr) {
    if (arr.length === 0) return undefined;
    return arr.slice(1);
  };

  fn.unzip = function(arr) {
    var arr_unzipped = [[], []];
    var length = arr.length % 2 === 0 ? arr.length : arr.length - 1;
    for (var i = 0; i < length; i += 2) {
      arr_unzipped[0].push(arr[i]);
      arr_unzipped[1].push(arr[i + 1]);
    }
    return arr_unzipped;
  };

  fn.zip = function(arr1, arr2) {
    var length = arr1.length >= arr2.length ? arr2.length : arr1.length;
    var arr_zipped = [];
    for (var i = 0; i < length; i++) {
      arr_zipped.push(arr1[i], arr2[i]);
    }
    return arr_zipped;
  };

  fn.zipWith = function(arr1, arr2, callback) {
    var length = arr1.length >= arr2.length ? arr2.length : arr1.length;
    var zipped = [];
    for (var i = 0; i < length; i++) {
      zipped.push(callback(arr1[i], arr2[i]));
    }
    return zipped;
  };

  return fn;

})(window.fn = window.fn || {});



/*
var fn = (function() {
  return {
    // Returns a function that can only be called once
    once : function(f) {
      var used= false;
      return function() {
        if (!used) {
          used = true;
          return f.apply(this, arguments);
        }
      };
    },

    // Simple curry.  Returns a function that has only been partially applied.
    curry : function(f, x) {
      return function(y) {
        return f(x, y);
      };
    },

    map : function(arr, callback) {
      var a = [];
      for (var i = 0; i < arr.length; i++) {
        a.push(callback(arr[i], i, arr));
      }
      return a;
    },
    filter : function(arr, callback) {
      var a = [];
      for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
          a.push(arr[i]);
        }
      };
      return a;
    },

    // take n elements
    take : function(arr, count) {
      count = count < arr.length ? count : arr.length;
      var a = [];
      for (var i = 0; i < count; i++) {
        a.push(arr[i]);
      }
      return a;
    },

    // Takes while predicate is true
    take_while : function(arr, callback) {
      var a = [];
      for (var i = 0; i < arr.length; i++) {
        if (callback(arr[i])) {
          a.push(arr[i]);
        } else {
          return a;
        }
      }
      return a;
    },


// Insert elm at position in array -- 0 based
    insert_at : function(arr, elm, position) {
      var left = arr.slice(0, position);
      var right = arr.slice(position, arr.length);
      return Array.prototype.concat(left, elm, right);
    },

    //
    range : function(start, end, step) {
      switch(arguments.length) {
        case 1:
          end = arguments[0],
          start = 0,
          step = 1;
          break;
        case 2:
          step = 1;
          break;
        case 3:
          if (step === 0) { return undefined; }
          break;
      }
      var arr = [];
      if (step < 0) {
        for (var i = start; i > end; i += step) {
          arr.push(i);
        }
      } else {
        for (var i = start; i < end; i += step) {
          arr.push(i);
        }
      }
      return arr;
    },





    flatten : function(arr) {
      var acc = [];
      for (var i = 0; i < arr.length; i++) {

      }
      return acc;
    },

  }
}());
*/

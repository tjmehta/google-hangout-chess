var helpers = module.exports = {};

helpers.isEmptyObject = function() {
  var returnVal = false;

  if (typeof thing == 'object') {
    if (Array.isArray(thing)) {
      // array
    }
    else {
      // object
      returnVal = true;
      for (var key in thing) {
        returnVal = false;
        break;
      }
    }
  }

  return returnVal;
};

helpers.exists = function(thing){
  return (thing !== null && thing !== undefined);
};

helpers.isEmpty = function(thing) {
  var returnVal;
  if (!thing) {
    returnVal = true;
  }
  else {
    if (typeof thing == 'object') {
      if (Array.isArray(thing)) {
        // array
        returnVal = (thing.length === 0);
      }
      else {
        // object
        returnVal = true;
        for (var key in thing) {
          if (thing.hasOwnProperty(key)){
            returnVal = key; // returns the first key found
            break;
          }
        }
      }
    }
    else if (typeof thing == 'string') {
      // string
      returnVal = (thing.length === 0);
    }
    else {
      // other
      returnVal = !thing;
    }
  }

  return returnVal;
};

helpers.exists = function(thing) {
  return (thing !== null && thing !== undefined);
};

helpers.clone = function(thing) {
  var retVal;

  if (Array.isArray(thing)) {
    retVal = Array.prototype.constructor.apply([], thing);
  }
  else if (typeof thing == 'object') {
    retVal = {};
    for (var key in thing) {
      if (thing.hasOwnProperty(key)) {
        retVal[key] = thing[key];
      }
    }
  }
  else {
    retVal = thing;
  }

  return retVal;
};

helpers.cloneAndAdd = function(thing, stuffToAdd) {
  var retVal = this.clone(thing);

  if (Array.isArray(stuffToAdd)) {
    Array.prototype.push.apply(retVal, stuffToAdd);
  }
  else if (typeof stuffToAdd == 'object') {
    for (var key in stuffToAdd) {
      if (stuffToAdd.hasOwnProperty(key)) {
        retVal[key] = stuffToAdd[key];
      }
    }
  }
  else {
    retVal = thing;
    retVal += stuffToAdd;
  }

  return retVal;
};

helpers.flattenObj = function(o, startPath){
  var flat = {}, flatten;
  if (!flatten) {
    flatten = function flatten(obj, path){
      if ( (obj.toString && obj.toString() == '[object Object]') || (!obj.toString && Object.prototype.toString.call(obj) == '[object Object]') ) {
        console.log('path1', path);
        path = path===undefined ? '' : path+'.';
        for(var key in obj)
          flatten( obj[key], path+key);
      }
      else if (Array.isArray(obj)) {
        console.log('path2', path);
        path = path===undefined ? '' : path+'.';
        var i = 0;
        while (i < obj.length) {
          flatten( obj[i], path+i, flatten);
          i++;
        }
      }
      else {
        console.log('path3', path);
        flat[path] = obj;
      }
      return flat;
    };
  }
  return flatten(o, startPath);
};

helpers._deleteKeyPathSplit = function(keyPathSplit, object, onlyDeleteIf) {
  var i, len, key;
  var valueAtPath = object;

  var deleteLastKey = function() {
    keyPathSplit.pop();
    helpers._deleteKeyPathSplit(keyPathSplit, object, helpers.isEmptyObject);
  };

  len = keyPathSplit.length;

  for (i=0; i<len; i++) {
    key = keyPathSplit[i];
    if (!helpers.exists(valueAtPath[key])) {
      break; //if no values at path, no need to continue down path
    }
    else {
      if (i === len-1) {
        // value found.
        console.log(key, 'last');
        if (onlyDeleteIf) {
          if (onlyDeleteIf(valueAtPath[key])) {
            console.log('onlyDeleteIf');
            console.log(delete valueAtPath[key]);
            deleteLastKey();
          }
        }
        else {
          console.log(delete valueAtPath[key]);
          deleteLastKey();
        }
      }
      else {
        // not last, continue down path
        console.log(key);
        valueAtPath = valueAtPath[key];
      }
    }
  }
};

helpers.joinArrays = function(args) {
  var joined = [];
  args = Array.isArray(args) ? args : Array.prototype.slice.apply(arguments);

  args.forEach(function(array) {
    Array.prototype.push.apply(joined, array);
  });

  return joined;
};

helpers.deleteKeyPaths = function(keyPathsArray, object) {
  keyPathsArray.forEach(function(keyPath) {
    helpers.deleteKeyPath(keyPath, object);
  });
};

helpers.deleteKeyPath = function(keyPath, object) {
  var keyPathSplit = keyPath.split('.');
  this._deleteKeyPathSplit(keyPathSplit, object);
};
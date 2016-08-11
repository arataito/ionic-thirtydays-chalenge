angular.module('starter.services', [])


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.service('Cache', function(){
  this.tryDay;

})

.service('SaveCache', function(Cache){
  this.save = function (day) {
    Cache.tryDay = day;
  }
})

.factory('Challenges', function(LocalDb) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var challenges = [
  {
    day: 1,
    time: 3,
    text: 'You on your way?',
  },
  {
    day: 2,
    time: 2,
    text: 'You on your way?',
  },
  {
    day: 3,
    time: 3,
    text: 'You on your way?',
  },
  {
    day: 4,
    time: 3,
    text: 'You on your way?',
  },
  {
    day: 5,
    time: 3,
    text: 'You on your way?',
  },
  {
    day: 6,
    time: 2,
    text: 'You on your way?',
  },
  {
    day: 7,
    time: 2,
    text: 'You on your way?',
  },
  {
    day: 8,
    time: 2,
    text: 'You on your way?',
  },
  {
    day: 9,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 10,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 11,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 12,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 13,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 14,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 15,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 16,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 17,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 18,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 19,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 20,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 21,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 22,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 23,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 24,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 25,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 26,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 27,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 28,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 29,
    time: 30,
    text: 'You on your way?',
  },
  {
    day: 30,
    time: 30,
    text: 'You on your way?',
  }
  ];

  return {
    all: function() {
      return challenges;
    },
    get: function(date) {
      for (var i = 0; i < challenges.length; i++) {
        if (challenges[i].day === parseInt(date)) {
          return challenges[i];
        }
      }
      return null;
    }
  };
})

.factory('LocalDb', function($q) {
  var _db;
  var _dataset;

  function initDB() {
    // Creates the database or opens if it already exists
    _db = new PouchDB('localDb', {adapter: 'websql'});
  };

  function getAll() {
    if (!_dataset) {
       return $q.when(_db.allDocs({ include_docs: true}))
            .then(function(docs) {
                // Each row has a .doc object and we just want to send an
                // array of birthday objects back to the calling controller,
                // so let's map the array to contain just the .doc objects.
                _dataset = docs.rows.map(function(row) {
                    // Dates are not automatically converted from a string.
                    return row.doc;
                });
                // Listen for changes on the database.
                _db.changes({ live: true, since: 'now', include_docs: true})
                   .on('change', onDatabaseChange);

                return _dataset;
            });
    } else {
        // Return cached data as a promise
        return $q.when(_dataset);
    }
  };

  function addOne(one) {
    return $q.when(_db.put(one));
  };

  function deleteOne(one) {
    return $q.when(_db.remove(one));
  };

  function countAll(){
    return getAll().length;
  }

  function deleteAll() {
    return $q.when(_db.allDocs({ include_docs: true}))
        .then(function(docs){
          docs.rows.map(function(row){
            console.log(row);
            $q.when(_db.remove(row.doc)).then(function (result) {
              console.log(result);
            }).catch(function (err) {
              console.log(err);
            });
          });
        });
  };

  // function deleteAll() {
  //   _dataset = [];
  //   $q.when(_db.allDocs({ include_docs: true}))
  //       .then(function(docs){
  //         docs.rows.map(function(row){
  //           $q.when(_db.remove(row));
  //         });
  //       });
  //   return true;
  // };

  function onDatabaseChange(change) {
    var index = findIndex(_dataset, change.id);
    var data = _dataset[index];

    if (change.deleted) {
        if (data) {
            _dataset.splice(index, 1); // delete
        }
    } else {
        if (data && data._id === change.id) {
            _dataset[index] = change.doc; // update
        } else {
            _dataset.splice(index, 0, change.doc) // insert
        }
    }
  }

  // Binary search, the array is by default sorted by _id.
  function findIndex(array, id) {
      var low = 0, high = array.length, mid;
      while (low < high) {
      mid = (low + high) >>> 1;
      array[mid]._id < id ? low = mid + 1 : high = mid
      }
      return low;
  }

  return {
    initDB: initDB,
    getAll: getAll,
    addOne: addOne,
    deleteOne: deleteOne,
    deleteAll: deleteAll,
    countAll: countAll
  };
})

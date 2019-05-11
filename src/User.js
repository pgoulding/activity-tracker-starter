if (typeof module !== 'undefined') {
  userData = require('../data/users-test-data')
  UserRepo = require('./UserRepo')
  hydrationData = require('../data/hydration-test-data')
  Hydration = require('./User')
  hydration = new Hydration()

}

class User {
  constructor(userID) {
    this.user = (this.returnUserData(userID));
    // this.hydration = (new Hydration(userID));

  }

  returnUserData(index) {
    return userData.find(ele => ele.id === index)
  }

  returnUserFirstName() {
    return this.user.name.split(' ').shift()
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
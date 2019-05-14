if (typeof module !== 'undefined') {
  userData = require('../data/users-test-data')
  activityData = require('../data/activity-test-data')
  UserRepo = require('./UserRepo')
}

class User {
  constructor(userID) {
    this.user = (this.returnUserData(userID));
    this.userFriends = (this.findFriends())
  }

  returnUserData(index) {
    return userData.find(ele => ele.id === index)
  }

  returnUserFirstName() {
    return this.user.name.split(' ').shift()
  }

  findFriends() {
    let index = this.user.id
    let userFriends = userData.slice(index, index + 2)
    return userFriends.length < 2 ? userData.slice(0, 2) : userFriends
  }

  friendOneStepCountForWeek(weekStart) {
    
    let friendOneData = activityData.find(friendData => friendData.userID === this.userFriends[0].id)
    let index = friendOneData.activityData.findIndex(ele => ele.date === weekStart)
    let friendOneWeek = friendOneData.activityData.slice(index, index + 7)

    return friendOneWeek
    // return friendOneData
    // let allSteps = activityData.reduce((acc, sum) => {
    //   sum.activityData.forEach(step => {
    //     if (acc.indexOf(step) === -1) {
    //       acc.push(step)
    //     }
    //   })
    //   return acc
    // }, [])
  } 

  friendTwoStepCountForWeek (weekStart) {
    let friendTwoData = activityData.find(friendData => friendData.userID === this.userFriends[1].id)
    let index = friendTwoData.activityData.findIndex(ele => ele.date === weekStart)
    let friendTwoWeek = friendTwoData.activityData.slice(index, index + 7)
    
    return friendTwoWeek
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
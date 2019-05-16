if (typeof module !== 'undefined') {
  userData = require('../data/users-test-data')
  hydrationData = require('../data/hydration-test-data')
  User = require('./User')
  user = new User(1)
} 
class Hydration {
  constructor() {
    this.data = (this.findHydrationData(user.user.id));
  }

  findHydrationData(ident) {
    return hydrationData.find(ele => ele.userID === ident)
  }

  averageOuncesPerDay() {
    let ounces = this.data.hydrationData
    let average = ounces.map(ele => ele.numOunces)
      .reduce((acc, value) => {
        acc += value / ounces.length
        return acc
      }, 0)
    return Math.floor(average)
  }

  amountHydratedByDay(day) {
    let userOunce = this.data.hydrationData;
    return userOunce.filter(ounces => ounces.date === day)
      .map(oz => oz.numOunces).shift()
  }

  waterForWeek(startDate) {
    let week = this.data.hydrationData;
    let firstDayIndex = week.findIndex(ele => ele.date === startDate) 
    let sliceWeek = week.slice((firstDayIndex - 6), firstDayIndex + 1)
    return sliceWeek
  }

  userHydrationStreak () {
    let results = []
    let currentSeries = []
    this.data.hydrationData.forEach((currentItem, index) => {
      if (currentItem === this.data.hydrationData[this.data.hydrationData.length - 1]) {
        return;
      }
      let firstNum = currentItem.numOunces;
      let secondNum = this.data.hydrationData[index + 1].numOunces;
      currentSeries.push(currentItem)
      if (firstNum > secondNum) {
        if (currentSeries.length >= 3) {
          results.push(currentSeries);
        }
        currentSeries = [];
      }
    })
    
    let streaks = results.map(streak => {
      return {start:streak.shift().date, end:streak.pop().date}
    })

    return streaks;
  }

}

if (typeof module !== 'undefined') {
  module.exports = Hydration;
}
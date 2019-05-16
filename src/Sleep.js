if (typeof module !== 'undefined') {
  userData = require('../data/users-test-data')
  sleepData = require('../data/sleep-test-data')
  User = require('./User')
  user = new User(1)
}

class Sleep {
  constructor() {
    this.data = (this.findSleepData(user.user.id));
  }
  
  findSleepData(ident) {
    return sleepData.find(user => user.userID === ident)
  }

  //For a user(identified by their userID), the average number of hours slept per day
  averageSleepPerDay() {
    let userSleep = this.data.sleepData.reduce((acc, sum) => {
      acc += sum.hoursSlept
      return Math.floor(acc)
    }, 0) / this.data.sleepData.length

    return parseFloat(userSleep).toFixed(2)
  }
  //For a user, their average sleep quality per day over all time
  averageSleepQualAllTime() {
    let userAverage = this.data.sleepData.reduce((acc, sum) => {
      acc += sum.sleepQuality
      return Math.floor(acc)
    }, 0) / this.data.sleepData.length
    return parseFloat(userAverage).toFixed(2)
  }

  //For a user, their average sleep hours per day over all time
  averageSleepHoursAllTime() {
    let averageAllTime =  this.data.sleepData.reduce((acc, sum) => {
      acc += sum.hoursSlept
      return Math.floor(acc)
    }, 0) / this.data.sleepData.length
    return parseFloat(averageAllTime).toFixed(2)
  }

  //For a user, how many hours they slept for a specific day(identified by a date)

  hoursSleptOnDay(day) {
    return this.data.sleepData.filter(hours => hours.date === day)
      .map(hr => hr.hoursSlept).shift()
  }

  qualityOnDay(day) {
    return this.data.sleepData.filter(hours => hours.date === day)
      .map(hr => hr.sleepQuality).shift()
  }

  //For a user, how many hours slept each day over the course of a given week(7 days) - you should be able to calculate this for any week, not just the latest week

  hoursSleptGivenWeek(weekStart) {
    let firstDayIndex = this.data.sleepData.findIndex(ele => ele.date === weekStart)
    let week = this.data.sleepData.slice((firstDayIndex - 6), firstDayIndex + 1)
      .map(hours => { 
        return {date: hours.date, hoursSlept: hours.hoursSlept}
      })
    return week
  }

  //For a user, their sleep quality each day over the course of a given week(7 days) - you should be able to calculate this for any week, not just the latest week

  sleepQualityGivenWeek(weekStart) {
    let firstDayIndex = this.data.sleepData.findIndex(ele => ele.date === weekStart)
    let week = this.data.sleepData.slice((firstDayIndex - 6), firstDayIndex + 1)
      .map(hours => {
        return { date: hours.date, quality: hours.sleepQuality}
      })
      
    return week
  }

  //For all users, the average sleep quality

  allUsersSleepQuality() {
    let allSleepQual = sleepData.reduce((acc, sum) => {
      sum.sleepData
        .forEach(sums => {
          if (acc.indexOf(sums) === -1) {
            acc.push(sums)
          }
        })
      return acc;
    }, [])
    return allSleepQual.reduce((accs, summed) => {
      accs += summed.sleepQuality
      return Math.floor(accs)
    }, 0) / allSleepQual.length
  }

  //Find all users who average a sleep quality greater than 3 for a given week(7 days) - you should be able to calculate this for any week, not just the latest week

  allUsersGoodSleepGivenWeek(weekStart) {
    let allUsersWeek = sleepData.reduce((acc, users, i) => {
      let index =  users.sleepData.findIndex(user => user.date === weekStart)
      acc.push({userID: users.userID, weeklyData: users.sleepData.slice((index -6), index +1)})
      return acc
    }, []) 

    let averageHours = allUsersWeek.reduce((acc, sum) => {
      acc.push({userID: sum.userID, averageSleepQual: parseFloat(sum.weeklyData.reduce((accum, hour) => {
        accum += hour.sleepQuality
        return accum
      }, 0) / 7).toFixed(1)
      })
      return acc
    }, [])
    let greaterThanThree = averageHours.filter(item => item.averageSleepQual >= 3)

    return greaterThanThree
  }

  // Iteration 5 Create your own metric
  // return the 3 day streaks of sleep quality for a user
  // userSleepQualityStreak () {
  //   let results = []
  //   let currentSeries = []
  //   this.data.sleepData.forEach((currentItem, index) => {
  //     if (currentItem === this.data.sleepData[this.data.sleepData.length - 1]) {
  //       return;
  //     }
  //     let firstNum = currentItem.hoursSlept;
  //     let secondNum = this.data.sleepData[index + 1].hoursSlept;
  //     currentSeries.push(currentItem)
  //     if (firstNum > secondNum) {
  //       if (currentSeries.length >= 3) {
  //         results.push(currentSeries);
  //       }
  //       currentSeries = [];
  //     }
  //   })
    
  //   let streaks = results.map(streak => {
  //     return {start:streak.shift().date, end:streak.pop().date}
  //   })

  //   return streaks;
  // }

  //For a given day(identified by the date), find the users who slept the most number of hours(one or more if they tied)
  championOfSleepers(day) {
    let hoursDay = sleepData.map(users => {
      return {userID: users.userID, date: users.sleepData.find(dates => dates.date === day)}
    })
    let newHoursDay = hoursDay.map(singleDay => {
      return {userID: singleDay.userID, hours: singleDay.date.hoursSlept}
    })
    let user = newHoursDay.sort((a, b) => b.hours - a.hours)
    let userArr = [];
    let test = user.forEach(users => {
      if (user[0].hours === users.hours) {
        userArr.push(users)
      } else {
        return userArr
      }
    })
    return userArr
  }
  // Make your own metric
  // For a user, their longest night of sleep.
  longestNightSleep() {
    let longestNight = this.data.sleepData.sort((a, b) => {
      return b.hoursSlept - a.hoursSlept
    }).shift()
    return longestNight
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
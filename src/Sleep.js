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

  averageSleepPerDay() {
    let userSleep = this.data.sleepData.reduce((acc, sum) => {
      acc += sum.hoursSlept
      return Math.floor(acc)
    }, 0) / this.data.sleepData.length

    return parseFloat(userSleep).toFixed(2)
  }

  averageSleepQualAllTime() {
    let userAverage = this.data.sleepData.reduce((acc, sum) => {
      acc += sum.sleepQuality
      return Math.floor(acc)
    }, 0) / this.data.sleepData.length
    return parseFloat(userAverage).toFixed(2)
  }

  averageSleepHoursAllTime() {
    let averageAllTime =  this.data.sleepData.reduce((acc, sum) => {
      acc += sum.hoursSlept
      return Math.floor(acc)
    }, 0) / this.data.sleepData.length
    return parseFloat(averageAllTime).toFixed(2)
  }

  hoursSleptOnDay(day) {
    return this.data.sleepData.filter(hours => hours.date === day)
      .map(hr => hr.hoursSlept).shift()
  }

  qualityOnDay(day) {
    return this.data.sleepData.filter(hours => hours.date === day)
      .map(hr => hr.sleepQuality).shift()
  }

  hoursSleptGivenWeek(weekStart) {
    let firstDayIndex = this.data.sleepData.findIndex(ele => ele.date === weekStart)
    let week = this.data.sleepData.slice((firstDayIndex - 6), firstDayIndex + 1)
      .map(hours => { 
        return {date: hours.date, hoursSlept: hours.hoursSlept}
      })
    return week
  }

  sleepQualityGivenWeek(weekStart) {
    let firstDayIndex = this.data.sleepData.findIndex(ele => ele.date === weekStart)
    let week = this.data.sleepData.slice((firstDayIndex - 6), firstDayIndex + 1)
      .map(hours => {
        return { date: hours.date, quality: hours.sleepQuality}
      })
      
    return week
  }

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

  championOfSleepers(day) {
    let hoursDay = sleepData.map(users => {
      return {userID: users.userID, date: users.sleepData.find(dates => dates.date === day)}
    })

    let newHoursDay = hoursDay.map(singleDay => {
      return {userID: singleDay.userID, hours: singleDay.date.hoursSlept}
    })

    let user = newHoursDay.sort((a, b) => b.hours - a.hours)
    let userArr  = user.filter(users => user[0].hours === users.hours)
    return userArr
  }

  longestNightSleep() {
    let newSleep = [...this.data.sleepData]
    let longestNight = newSleep
      .sort((a, b) => b.hoursSlept - a.hoursSlept)
      .shift()
    return longestNight
  }
}

if (typeof module !== 'undefined') {
  module.exports = Sleep;
}
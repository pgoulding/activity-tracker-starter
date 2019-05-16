const chai = require('chai')
const expect = chai.expect;

const Sleep = require('../src/Sleep');
const data = require('../data/sleep-test-data')

describe('Sleep Test', function () {
  let sleep;

  beforeEach(function () {
    sleep = new Sleep()
  })

  it('should be a function', function () {
    expect(Sleep).to.be.a('function')
  })

  it('should be an instantiation of Sleep', function () {
    expect(sleep).to.be.a.instanceOf(Sleep)
  })

  it('should find the specific sleep data per user', function () {
    expect(sleep.findSleepData(1)).to.be.equal(sleep.data)
    expect(sleep.findSleepData(1)).to.be.equal(data[0])
  })

  it('should average their hours slept per day', function () {
    expect(sleep.averageSleepPerDay()).to.deep.equal('7.06')
  })

  it('should return their average sleep quality per day over all time', function () {
    expect(sleep.averageSleepQualAllTime()).to.equal('2.48')
  })

  it('should return their average sleep hours per day over all time', function () {
    expect(sleep.averageSleepHoursAllTime()).to.equal('7.06')
  })

  it('should return how many hours they slept for a specific day(identified by a date)', function () {
    expect(sleep.hoursSleptOnDay('06/05/2019')).to.equal(8)
  })

  it('should return how many hours slept each day over the course of a given week(7 days)', function () {
    expect(sleep.hoursSleptGivenWeek('30/05/2019')).to.have.length(7)
  })

  it('should return their sleep quality each day over the course of a given week(7 days)', function () {
    expect(sleep.sleepQualityGivenWeek('22/06/2019')).to.have.length(7)
  })

  it('should return for all users, the average sleep quality', function () {
    expect(sleep.allUsersSleepQuality()).to.be.a('number')
    expect(sleep.allUsersSleepQuality()).to.equal(2.57)
  })

  it('should find the users who slept the most hours for a given day (one or more if they tied)', function () {
    expect(sleep.championOfSleepers('06/05/2019')).to.be.a('array').that.has.length(1)
  })

  it('should find all users who average a sleep quality greater than 3 for a given week(7 days) - you should be able to calculate this for any week', function () {
    expect(sleep.allUsersGoodSleepGivenWeek('22/07/2019')).to.be.a('array')
    expect(sleep.allUsersGoodSleepGivenWeek('22/07/2019')[2]).to.be.a('object').that.includes({ userID: 4, averageSleepQual: '3.0' })
    expect(sleep.allUsersGoodSleepGivenWeek('22/07/2019')).to.have.length(5)

  })

  it('should display the night they slept the longest', function () {
    expect(sleep.longestNightSleep()).to.be.a('object');
  })


})
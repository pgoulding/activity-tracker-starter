const chai = require('chai');
const expect = chai.expect;

var User = require('../src/User');

describe('User', function () {
  let userRepo;
  let user;

  beforeEach(function () {
    userRepo = new UserRepo()
    user = new User(1)
  })

  it('should be a function', function () {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function () {
    expect(user).to.be.a.instanceOf(User)
  })

  it('should be able to return a user object by ID', function () {
    expect(user.returnUserData(3)).to.equal(userRepo.users[2])
  })

  it('should return the first name of the user called', function () {
    expect(user.returnUserFirstName()).to.equal('Nyasia')
  })

  it('should find the user some friends', function () {
    expect(user.findFriends()).to.be.a('array')
    expect(user.findFriends()).to.have.length(2)
    expect(user.findFriends()).to.deep.equal([{
      id: 2,
      name: 'Shayne Swift',
      address: '747 Dickinson Gardens, South Helga AK 88484-2240',
      email: 'Lawson74@yahoo.com',
      strideLength: 4.5,
      dailyStepGoal: 11000
    },
    {
      id: 3,
      name: 'Cleo Lindgren',
      address: '744 Josephine Parkway, Hellerside OH 17625',
      email: 'Zachery.Von49@gmail.com',
      strideLength: 5.1,
      dailyStepGoal: 4000
    }])
  })

  it('should return the first friends activity data', function () {
    expect(user.friendOneStepCountForWeek('06/05/2019')).to.be.a('array')
  })

  it('should return the second friends activity data', function () {
    expect(user.friendTwoStepCountForWeek('06/05/2019')).to.be.a('array')
  })

  it('should return the first friends step average', function () {
    expect(user.friendOneStepAverageForWeek('06/05/2019')).to.be.a('number')
    expect(user.friendOneStepAverageForWeek('06/05/2019')).to.equal(6742)
  })

  it('should return the second friends step average', function () {
    expect(user.friendTwoStepAverageForWeek('06/05/2019')).to.be.a('number')
    expect(user.friendTwoStepAverageForWeek('06/05/2019')).to.equal(8147)
  })
})
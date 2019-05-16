/*----------------Variables-------------------*/
const dynamicUser = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
const todaysDate = moment().format("DD" + "/" + "MM" + "/" + "YYYY")
$('#datetime').html(todaysDate);

/*----------------new instantiations---------*/
const userRepo = new UserRepo();
const user = new User(dynamicUser)
const hydration = new Hydration()
const sleep = new Sleep()
const activity = new Activity()

console.log('userRepo: ', userRepo)
console.log('user: ', user)
console.log('hydration: ', hydration)
console.log('sleep: ', sleep)
console.log('activity: ', activity)

/*------------Methods Called-----------*/

/*-----------activity------------------*/
const averageStepsTodayAll = activity.allUsersStepsTakenOnDate(todaysDate);
const averageMinsTodayAll = activity.allUsersMinutesActiveForDate(todaysDate);
const averageStairsTodayAll =activity.allUsersStairsClimbedToday(todaysDate)
const usersStepAverage = userRepo.averageStepGoal();
const todaysSteps = activity.userStepsTakenToday(todaysDate);
const todaysMinutesActive = activity.userActiveMinutesPerDay(todaysDate);
const userMilesWalkedToday = activity.userMilesWalkedToday(todaysDate);
const userStairsClimbedToday = activity.userStairsClimbedToday(todaysDate);
const weeksSteps = activity.userStepsPerWeek(todaysDate)
const weeksMinutesActive = activity.userMinutesPerWeek(todaysDate)
const weeksStairs = activity.userStairsPerWeek(todaysDate)
const stepStreak = activity.userStepStreak()
const userStepRecordAllTime = activity.userAllTimeStepRecord();
/*-----------Hydration------------------*/
let dayHydration = hydration.amountHydratedByDay(todaysDate);
let weekHydration = hydration.waterForWeek(todaysDate)
const hydrationStreak = hydration.userHydrationStreak()
$('#user-hydration-streak').text(`You had ${hydrationStreak.length} streaks of three or more days with increasing ounces drank.`)
$('#hydration-streak-list-one').text(`Start Date: ${hydrationStreak[0].start} - End Date: ${hydrationStreak[0].end}`)
$('#hydration-streak-list-two').text(`Start Date: ${hydrationStreak[1].start} - End Date: ${hydrationStreak[1].end}`)
$('#hydration-streak-list-three').text(`Start Date: ${hydrationStreak[2].start} - End Date: ${hydrationStreak[2].end}`)

/*-----------Sleep------------------*/
let daySleep = sleep.hoursSleptOnDay(todaysDate);
let qualitySleep = sleep.qualityOnDay(todaysDate);
let weekSleep = sleep.hoursSleptGivenWeek(todaysDate)
let weekQualSleep = sleep.sleepQualityGivenWeek(todaysDate)
let longestNight = sleep.longestNightSleep()
let alltimeHoursSleep = sleep.averageSleepHoursAllTime()
let alltimeQualSleep = sleep.averageSleepQualAllTime()

/*----------------User info---------------*/
$('#user-name').text(`${user.user.name}`)
$('#user-address').text(user.user.address);
$('#user-email').text(user.user.email);
$('#user-step-goal').text(`Daily Step Goal: ${user.user.dailyStepGoal}`);
$('#user-stride-length').text(`Stride Length ${user.user.strideLength}`);
$('#user-profile-pic').html(`<img id="prof-pic" src="../images/${user.user.id}.jpg">`);
$('#user-longest-sleep-hours').text(`${longestNight.hoursSlept} Hours`);
$('#user-longest-sleep-date').text(`${longestNight.date}`);
$('#user-steps-record').text(`${userStepRecordAllTime} Steps`);
/*-------------activity info---------*/

$('#user-active').text(`You have been active for ${todaysMinutesActive} minutes today`);
$('#user-miles').text(`${userMilesWalkedToday} Miles`);
$('#all-user-active').text(`Average for all users was ${averageMinsTodayAll} minutes.`);
$('#user-steps-streak').text(`You had ${stepStreak.length} streaks of three or more days with increasing step counts.`);
$('#step-streak-list-one').text(`Start Date: ${stepStreak[0].start} - End Date: ${stepStreak[0].end}`);
$('#step-streak-list-two').text(`Start Date: ${stepStreak[1].start} - End Date: ${stepStreak[1].end}`);
$('#step-streak-list-three').text(`Star Date: ${stepStreak[2].start} - End Date: ${stepStreak[2].end}`);


/*-------------Friends Dash---------*/
const competitionResults = activity.compareTheUserandFriends(todaysDate)
$('#first-place').html(`<p>1st: ${competitionResults[0].name} ${competitionResults[0].totalSteps} steps!</p>`)
$('#second-place').html(`<p>2nd: ${competitionResults[1].name} ${competitionResults[1].totalSteps} steps!</p>`)
$('#third-place').html(`<p>3rd: ${competitionResults[2].name} ${competitionResults[2].totalSteps}  steps!</p>`)

/*------------Circle Graphs--------*/
const waterPercentage = () => Math.round(dayHydration / 64 * 100)
const walkingPercentage = () => parseFloat((todaysSteps / user.user.dailyStepGoal * 100).toFixed(2))
const minutesPerDay = () => (todaysMinutesActive / 150) * 100

const determineColor = percentage => {
  if (percentage < 50) {
    return 'red'
  } else if (percentage < 80) {
    return 'orange'
  } else {
    return 'green'
  }
}
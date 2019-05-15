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
const userStepRecordAllTime = activity.userAllTimeStepRecord();
const userStairsClimbedToday = activity.userStairsClimbedToday(todaysDate);

/*-----------Hydration------------------*/
let dayHydration = hydration.amountHydratedByDay(todaysDate);
let weekHydration = hydration.waterForWeek(todaysDate)


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
/*-------------activity info---------*/

$('#user-active').text(`You have been active for ${todaysMinutesActive} minutes today`)
$('#user-miles').text(`${userMilesWalkedToday} Miles`)
$('#all-user-active').text(`Average for all users was ${averageMinsTodayAll} minutes.`)
$('#user-steps-record').text(`${userStepRecordAllTime} Steps`)


/*------------Charts----------------*/
const sleepQual = $('#qual-slept-week-chart');
const sleepHours = $('#hours-slept-week-chart');
const hydrationWeek = $('#hydration-week-chart');
const activityWeek = $('#activity-week-chart');
const stepGoals = $('#step-goal-chart');
const sleepToday = $('#sleep-chart');
const activityStepChart = $("#activity-step-chart");
const activityStairChart = $('#activity-stairs-chart');

let hoursSleptChart = new Chart(sleepHours, {
  type: 'bar',
  data: {
    labels: [`${(weekSleep[0].date)}`, `${(weekSleep[1].date)}`, `${(weekSleep[2].date)}`, `${(weekSleep[3].date)}`, `${(weekSleep[4].date)}`, `${(weekSleep[5].date)}`, `${(weekSleep[6].date)}`],
    datasets: [{
      label: 'Hours Slept',
      data: [(weekSleep[0].hoursSlept), (weekSleep[1].hoursSlept), (weekSleep[2].hoursSlept), (weekSleep[3].hoursSlept), (weekSleep[4].hoursSlept), (weekSleep[5].hoursSlept), (weekSleep[6].hoursSlept)],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

let sleepQualityChart = new Chart(sleepQual, {
  type: 'line',
  data: {
    labels: [`${(weekQualSleep[0].date)}`, `${(weekQualSleep[1].date)}`, `${(weekQualSleep[2].date)}`, `${(weekQualSleep[3].date)}`, `${(weekQualSleep[4].date)}`, `${(weekQualSleep[5].date)}`, `${(weekQualSleep[6].date)}`],
    datasets: [{
      label: 'Sleep Quality',
      data: [(weekQualSleep[0].quality), (weekQualSleep[1].quality), (weekQualSleep[2].quality), (weekQualSleep[3].quality), (weekQualSleep[4].quality), (weekQualSleep[5].quality), (weekQualSleep[6].quality)],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

let hydrationWeekChart = new Chart(hydrationWeek, {
  type: 'line',
  data: {
    labels: [`${(weekHydration[0].date)}`, `${(weekHydration[1].date)}`, `${(weekHydration[2].date)}`, `${(weekHydration[3].date)}`, `${(weekHydration[4].date)}`, `${(weekHydration[5].date)}`, `${(weekHydration[6].date)}`],
    datasets: [{
      label: 'Ounces',
      data: [(weekHydration[0].numOunces), (weekHydration[1].numOunces), (weekHydration[2].numOunces), (weekHydration[3].numOunces), (weekHydration[4].numOunces), (weekHydration[5].numOunces), (weekHydration[6].numOunces)],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

let stepGoalComparisonChart = new Chart(stepGoals, {
  type: 'pie',
  data: {
    labels: [`Your Step Goal`, `Average Step Goal`],
    datasets: [{
      label: 'Goal',
      data: [(user.user.dailyStepGoal), (usersStepAverage)],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

let sleepChart = new Chart(sleepToday, {
  type: 'bar',
  data: {
    labels: [`Hours Slept Today`, `Sleep Quality Today`, ``, `Average Hours Slept`, `Average Sleep Quality`],
    datasets: [{
      label: 'Sleep',
      data: [(daySleep), (qualitySleep), null, (alltimeHoursSleep), (alltimeQualSleep) ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        null,
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        null,
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 3
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
})

const userStepCount = {
  label: 'Your Step Count',
  data: [todaysSteps],
  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.2)'],
  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)'],
  borderWidth: 1,
};

const averageStepCount = {
  label: 'Average Step Count',
  data: [averageStepsTodayAll],
  backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)'],
  borderColor: ['rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)'],
  borderWidth: 1,
};

const stepChart = new Chart(activityStepChart, {
  type: 'bar',
  data: {
    labels: ['Steps'],
    datasets:[averageStepCount, userStepCount]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});


const userStairCount = {
  label: 'Your Stairs Count',
  data: [userStairsClimbedToday],
  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.2)'],
  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)'],
  borderWidth: 1,
};

const averageStairCount = {
  label: 'Average Stair Count',
  data: [averageStairsTodayAll],
  backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)'],
  borderColor: ['rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)'],
  borderWidth: 1,
};

const stairChart = new Chart(activityStairChart, {
  type: 'bar',
  data: {
    labels: ['Stairs'],
    datasets: [
      averageStairCount, 
      userStairCount
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});



const actiivtyMinutesChart = $('#activity-minutes-chart')

// const averageMinsTodayAll = activity.allUsersMinutesActiveForDate(todaysDate);
// const todaysMinutesActive = activity.userActiveMinutesPerDay(todaysDate);

const userMinutesActive = {
  label: 'Your Minutes Active',
  data: [todaysMinutesActive],
  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 99, 132, 0.2)'],
  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(255, 99, 132, 1)'],
  borderWidth: 1,
};

const averageMinutesActive = {
  label: 'Average Minutes Active',
  data: [averageMinsTodayAll],
  backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(54, 162, 235, 0.2)'],
  borderColor: ['rgba(54, 162, 235, 1)', 'rgba(54, 162, 235, 1)'],
  borderWidth: 1,
};

const minutesChart = new Chart(actiivtyMinutesChart, {
  type: 'bar',
  data: {
    labels: ['Minutes'],
    datasets: [
      averageMinutesActive,
      userMinutesActive
    ]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

// const weeklyMinutesChart = $('#activity-minutes-chart')

// let hydrationWeekChart = new Chart(hydrationWeek, {
//   type: 'line',
//   data: {
//     labels: [`${(weekHydration[0].date)}`, `${(weekHydration[1].date)}`, `${(weekHydration[2].date)}`, `${(weekHydration[3].date)}`, `${(weekHydration[4].date)}`, `${(weekHydration[5].date)}`, `${(weekHydration[6].date)}`],
//     datasets: [{
//       label: 'Ounces',
//       data: [(weekHydration[0].numOunces), (weekHydration[1].numOunces), (weekHydration[2].numOunces), (weekHydration[3].numOunces), (weekHydration[4].numOunces), (weekHydration[5].numOunces), (weekHydration[6].numOunces)],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 3
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });

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

$('#user-water').html(`<div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart ${determineColor(waterPercentage())}">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="${waterPercentage()}, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">${waterPercentage()}%</text>
    </svg>
    <p>You drank ${dayHydration} oz's today.</p>
    <p>Your goal was 64 oz's.</p>
  </div>`);

$('#user-steps').html(`<div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart ${determineColor(walkingPercentage())}">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="${walkingPercentage()}, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text  x="18" y="20.35" class="percentage">${todaysSteps}</text>
    </svg>
    <p>Your goal was ${user.user.dailyStepGoal} steps.</p>
    <p>Average for all users was ${averageStepsTodayAll} steps.</p>
  </div>`);

$('#user-active').html(`<div class="single-chart">
    <svg viewBox="0 0 36 36" class="circular-chart ${determineColor(minutesPerDay())}">
      <path class="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path class="circle"
        stroke-dasharray="${minutesPerDay()}, 100"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text x="18" y="20.35" class="percentage">${todaysMinutesActive}</text>
    </svg>
  </div>`);
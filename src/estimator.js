const infectionsByRequestedTime = (data, currentlyInfected) => {
  let infections = null;
  const period = data.timeToElapse;
  let periodInDays;
  let unitPeriod;
  switch (data.periodType) {
    case 'weeks':
      periodInDays = period * 7;
      unitPeriod = periodInDays / 3;
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    case 'months':
      periodInDays = period * 30;
      unitPeriod = periodInDays / 3;
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    default:
      unitPeriod = period / 3;
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
  }
  return infections;
};

const covid19ImpactEstimator = ((data) => {
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = infectionsByRequestedTime(data, impact.currentlyInfected);
  const { currentlyInfected } = severeImpact;
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data, currentlyInfected);
  return { data, impact, severeImpact };
});

export default covid19ImpactEstimator;

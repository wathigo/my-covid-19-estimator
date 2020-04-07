const infectionsByRequestedTime = (data, currentlyInfected) => {
  let infections = null;
  switch (data.periodType) {
    case 'weeks':
      infections = currentlyInfected * (2 ** 70);
      break;
    case 'months':
      infections = currentlyInfected * (2 ** 300);
      break;
    default:
      infections = currentlyInfected * (2 ** 10);
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
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data, severeImpact.currentlyInfected);
  return { data, impact, severeImpact };
});

export default covid19ImpactEstimator;

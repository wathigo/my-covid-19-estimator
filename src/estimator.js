const covid19ImpactEstimator = ((data) => {
  const impact = {};
  const severeImpact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** 10);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** 10);
  return { data, impact, severeImpact };
});

export default covid19ImpactEstimator;

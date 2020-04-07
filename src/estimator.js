const covid19ImpactEstimator = (data => {
  impact = {};
  severeImpact = {};
  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;
  impact.infectionsByRequestedTime = impact.currentlyInfected * Math.pow(2, 10)
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * Math.pow(2, 10)
  return {data, impact, severeImpact}
});

export default covid19ImpactEstimator;

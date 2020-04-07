import Big from 'big.js';

const infectionsByRequestedTime = (data, currentlyInfected) => {
  let infections = null;
  const period = Big(data.timeToElapse);
  let periodInDays;
  let unitPeriod;
  switch (data.periodType) {
    case 'weeks':
      periodInDays = period * 7;
      unitPeriod = Math.round(periodInDays / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    case 'months':
      periodInDays = period * 30;
      unitPeriod = Math.round(periodInDays / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
    default:
      unitPeriod = Math.round(period / 3);
      infections = currentlyInfected * (2 ** unitPeriod);
      break;
  }
  return infections;
};

const severeCasesByRequestedTime = ((time) => Math.round(time * 0.15)
);

const casesForICUByRequestedTime = ((time) => Math.round(time * 0.05)
);

const hospitalBedsByRequestedTime = (data, severeCases) => {
  const availableBeds = data.totalHospitalBeds * 0.35;
  return availableBeds - severeCases;
};

const covid19ImpactEstimator = ((data) => {
  const impact = {};
  const severeImpact = {};
  const reportedCases = Big(data.reportedCases);

  impact.currentlyInfected = reportedCases * Big(10);
  severeImpact.currentlyInfected = reportedCases * Big(50);

  const iCurrentlyInfected = Big(impact.currentlyInfected);
  impact.infectionsByRequestedTime = infectionsByRequestedTime(data, iCurrentlyInfected);
  const siCurrentlyInfected = Big(severeImpact.currentlyInfected);
  severeImpact.infectionsByRequestedTime = infectionsByRequestedTime(data, siCurrentlyInfected);

  impact.severeCasesByRequestedTime = severeCasesByRequestedTime(impact.infectionsByRequestedTime);
  let time = severeImpact.infectionsByRequestedTime;
  severeImpact.severeCasesByRequestedTime = severeCasesByRequestedTime(time);

  const siSevereCases = severeImpact.severeCasesByRequestedTime;
  const iSevereCases = impact.severeCasesByRequestedTime;
  impact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, iSevereCases);
  severeImpact.hospitalBedsByRequestedTime = hospitalBedsByRequestedTime(data, siSevereCases);

  impact.casesForICUByRequestedTime = casesForICUByRequestedTime(impact.infectionsByRequestedTime);
  time = severeImpact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = casesForICUByRequestedTime(time);
  return { data, impact, severeImpact };
});

export default covid19ImpactEstimator;

import config from '@helpers/api/config.json'

const mockData = require('./mockData')

const wrapAPI = (axiosMock, params = {}) => {
  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/user/info`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.userInfoData });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/pathway/`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.pathway });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/cohort/events`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.events });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/cohort/patient-list`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.patientList });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/cohort/patient-list/row/6098`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.patients });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/predict/${params.subjectId}/risk`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.riskLine });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/p/${params.subjectId}/summary`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.summary });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/p/${params.subjectId}/timeline`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.timeline });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/p/${params.subjectId}/lab`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.lab });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/p/${params.subjectId}/echo`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.echo });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/p/${params.subjectId}/spect`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.spect });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/compare/${params.subjectId}/risk`,
      { event: 'Death', to: 'group', kind: 'histogram' },
    )
    .reply(200, { ...mockData.histogram });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/predict/${params.subjectId}/risk/input/weights`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, [...mockData.weight]);

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/compare/${params.subjectId}/risk/input/weights`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.radar });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/predict/${params.subjectId}/risk/input/weights/treemap`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.treeMap });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/compare/${params.subjectId}/tte`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.pathwayData });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/organization/list`,
      { headers: { Authorization: 'Bearer token' } },
    )
    .reply(200, { ...mockData.organizationList });

  axiosMock
    .onPost(
      `${config.HOSTNAME}/api/user/logout`,
    )
    .reply(200, { ...mockData.logout });

  axiosMock
    .onPost(
      `${config.HOSTNAME}/api/user/info`,
    )
    .reply(200, { ...mockData.userInfoChangeData });

  axiosMock
    .onPost(
      `${config.HOSTNAME}/api/user/update-password`,
    )
    .reply(200, { ...mockData.changePassword });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/predict/risk/ratio`,
    )
    .reply(200, { ...mockData.pieChartData });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/predict/risk/statisitcs`,
    )
    .reply(200, { ...mockData.statistics });

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/predict/risk/threshold`,
    )
    .reply(200, { ...mockData.defaultThreshold })

  axiosMock
    .onPost(
      `${config.HOSTNAME}/api/data/predict/risk/threshold`,
    )
    .reply(200, { ...mockData.postThresholdMsg })

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/data/predict/risk/metric`,
    )
    .reply(200, { ...mockData.metric })

  axiosMock
    .onGet(
      `${config.HOSTNAME}/api/user/notification`
    )
    .reply(200, { ...mockData.getNotification })

  axiosMock
    .onPost(
      `${config.HOSTNAME}/api/user/notification`
    )
    .reply(200, { ...mockData.postNotification })
}

module.exports = { wrapAPI }

import React from 'react';
import { shallow } from 'enzyme';
import AppendRow from '../AppendRow';

const data = {
  '': 'icon',
  diagnosis: 'Unstable angina',
  latestAdmission: '2016-10-12T16:00:00',
  riskScore: 0,
  subjectId: 12407,
}

const detailData = {
  administration: {
    priorCardiacSurgery: true,
    priorHospitalization: 7,
  },
  age: '53ys',
  birth: '1963.07',
  comorbidity: {
    diabetes: false,
    myocardialInfarction: false,
    stroke: false,
  },
  gender: 'M',
  height: '169.6cm',
  latestAdmission: '2016-10-12T16:00:00',
  latestDiagnosis: 'Unstable angina',
  riskScore: 0,
  subjectId: 12407,
  weight: '67kg',
}

describe('AppendRow Component', () => {
  let component;
  beforeEach(() => {
    component = shallow(<AppendRow data={data} detailData={detailData} event="death" />)
  })

  it('AppendRow가 data와 detailData가 있을 때, 렌더링 되어야 한다.', () => {
    expect(component).toHaveLength(1)
  })
})

import Router from 'next/router'
import axios from 'axios'
import _ from 'lodash'
import config from '@helpers/api/config.json';

const AllGrade = ['Administrator', 'Manager', 'User']
const AdminGrade = ['Administrator', 'Manager']

export const userCheck = (type, role) => {
  let grade;
  if (type === 'all') grade = AllGrade
  if (type === 'admin') grade = AdminGrade

  return _.includes(grade, role)
}

export const redirect = (ctx, url) => {
  if (typeof window === 'undefined') {
    ctx.res.writeHead(302, { Location: url })
    ctx.res.end()
  } else {
    Router.push(url)
  }
}

export const getUserInfo = (jwt) => (
  axios.get(`${config.HOSTNAME}/api/user/info`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  }).then((res) => {
    const { data: { role: { name } } } = res
    return name
  }).catch((error) => {
    console.log(error)
  })
)

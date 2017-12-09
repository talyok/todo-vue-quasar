import axios from 'axios'

const api = 'http://localhost:3000/todos/'
export default {
  create (data) {
    return axios.request({
      url: api,
      method: 'post',
      data: data
    })
  },

  get (id) {
    id = id || ''
    return axios.request({
      url: api + id,
      method: 'get'
    })
  },

  update (data) {
    return axios.request({
      url: api + data.id,
      method: 'put',
      data: data
    })
  },

  delete (id) {
    return axios.request({
      url: api + id,
      method: 'delete'
    })
  }
}
/*
export default {
  rules (userDetails) {
    return axios.request({
      url: api.api + 'user/rules/getRules',
      method: 'post',
      data: userDetails,
      headers: {
        'Authorization': 'Bearer' + LocalStorage.get.item('token')
      }
    })
  },
  registerUser (userDetails) {
    console.log(userDetails)
    return axios.request({
      url: api.api + 'user',
      method: 'post',
      data: userDetails,
      headers: {
        'Authorization': 'Bearer' + LocalStorage.get.item('token')
      }
    }).then((res) => {
      if (res) {
        return true
      }
      else {
        return false
      }
    }).catch((err) => {
      console.log(err.response.data.message)
    })
  },
  getUserTypes () {
    return axios.request({
      url: api.api + 'access-list',
      method: 'get',
      headers: {
        'Authorization': 'Bearer' + LocalStorage.get.item('token')
      }
    }).then((res) => {
      return res
    }).catch((err) => {
      return err
    })
  },
  SearchUser (user) {
    return axios.request({
      url: api.api + 'user/searchUser',
      method: 'post',
      data: user,
      headers: {
        'Authorization': 'Bearer' + LocalStorage.get.item('token')
      }
    }).then((res) => {
      return res
    }).catch((err) => {
      return err
    })
  },
  updateTemp (userdata) {
    return axios.request({
      url: api.api + 'user/updateTemp',
      method: 'post',
      data: userdata,
      headers: {
        'Authorization': 'Bearer' + LocalStorage.get.item('token')
      }
    }).then((res) => {
      return res
    }).catch((err) => {
      return err
    })
  }
}
*/

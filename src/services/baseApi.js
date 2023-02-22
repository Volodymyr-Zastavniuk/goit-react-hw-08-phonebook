import axios from 'axios';

export const publicApi = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

// export const privateApi = axios.create({
//   baseURL: 'https://connections-api.herokuapp.com',
// });

export const token = {
  set: token => {
    publicApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  remove: () => {
    publicApi.defaults.headers.common.Authorization = null;
  },
};

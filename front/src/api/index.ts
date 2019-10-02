import axios, { AxiosRequestConfig } from 'axios';
import config from './config';

export interface User {
  id: number;
  fullname: string;
  email: string;
  age: number;
  username: string;
  avatar?: string;

}

export type NewUserData = {
  fullname: string;
  email: string;
  age: number;
  username: string;
}



const apiCaller = async (args: AxiosRequestConfig) => {
  try {
    const response = await axios(args);
    return response;
  } catch (err) {
    if (err.respose) {
      console.log(err.response.status);
    }
    throw err;
  }
}

const api = {
  getUsers: () => {
    return apiCaller({
      url: `${config.url}/users`,
      method: "GET"
    }).then(response => response.data)
  },
  createUser: (type: string, userData: NewUserData) => {
    return apiCaller({
      url: `${config.url}/users/${type}`,
      method: "POST",
      data: userData
    }).then(response => response.data)
  }
}

export default api;

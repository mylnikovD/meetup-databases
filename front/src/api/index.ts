import axios, { AxiosRequestConfig } from "axios";
import config from "./config";

export interface User {
  id: number;
  fullname: string;
  email: string;
  age: number;
  username: string;
  avatar?: string;
  Role: {
    title: string;
  }
}

export interface Post {
  id: number;
  content: string;
  authorID: number;
}

export type NewUserData = {
  fullname: string;
  email: string;
  age: number;
  username: string;
};

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
};

const api = {
  getUsers: (type: string, name: string, offset: number, limit: number) => {
    return apiCaller({
      url: `${config.url}/users/${type}`,
      method: "GET",
      params: {
        name,
        offset,
        limit
      }
    }).then(response => response.data);
  },
  createUser: (type: string, userData: NewUserData) => {
    return apiCaller({
      url: `${config.url}/users/${type}`,
      method: "POST",
      data: userData
    }).then(response => response.data);
  },
  getPosts: (type: string, authorID: number) => {
    return apiCaller({
      url: `${config.url}/posts/${type}`,
      method: "GET",
      params: {
        authorID
      }
    }).then(response => response.data);
  }
};

export default api;

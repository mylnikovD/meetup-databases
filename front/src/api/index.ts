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
  };
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
  roleID: number;
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
  getRoles: (type: string) => {
    return apiCaller({
      url: `${config.url}/roles/${type}`,
      method: "GET"
    }).then(response => response.data);
  },
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
  },
  editPost: (type: string, postID: number, value: string) => {
    return apiCaller({
      url: `${config.url}/posts/${type}/${postID}`,
      method: "PUT",
      data: {
        value
      }
    })
      .then(response => response.data)
      .catch(error => {
        return alert(error.message + " Rollback initiated");
      });
  },
  deletePost: (type: string, postID: number) => {
    return apiCaller({
      url: `${config.url}/posts/${type}/${postID}`,
      method: "DELETE"
    })
      .then(response => response.data)
      .catch(error => {
        return alert(error.message + " Rollback initiated");
      });
  }
};

export default api;

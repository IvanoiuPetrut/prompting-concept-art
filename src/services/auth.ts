import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const headers = {
  "Content-Type": "application/json"
};

function login(name: string, password: string): Promise<string> {
  const data = {
    name,
    password
  };

  return axios
    .post(`${backendUrl}/users/login`, data, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
}

function register(name: string, password: string): Promise<any> {
  const data = {
    name,
    password
  };

  return axios
    .post(`${backendUrl}/users/register`, data, { headers })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
}

export { login, register };

import axios from 'axios';

export const client = axios.create({
  baseURL: 'http://localhost:8080',

  timeout: 15000,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json',
});

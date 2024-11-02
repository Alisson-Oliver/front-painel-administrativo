import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 15000
});

export default {
  apiUrl: process.env.API_URL,
  port: process.env.PORT || 3000,
};

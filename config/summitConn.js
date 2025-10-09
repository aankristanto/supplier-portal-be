import axios from "axios";

const summitApi = axios.create({
  baseURL: process.env.API_SUMMIT,
  timeout: 10000,
  headers: {
    "origin": "https://spm.sumbiri.com"
  },
});


export default summitApi;
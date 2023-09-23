import axios from "axios";

const request = axios.create({
  baseURL: "https://650d5e50a8b42265ec2c18d2.mockapi.io/learningcenter/",
  timeout: 10000,
});

export default request;






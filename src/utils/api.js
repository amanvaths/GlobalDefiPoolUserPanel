import axios from "axios";

const api = axios.create({
  
  baseURL: "https://globaldefipool.com/api",
  //baseURL: "http://ec2-13-57-196-194.us-west-1.compute.amazonaws.com/api/",//https://ec2-13-57-196-194.us-west-1.compute.amazonaws.com/api
  //baseURL: "https://testapi.myfastearn.in/api/",//https://ec2-13-57-196-194.us-west-1.compute.amazonaws.com/api
  //baseURL: "http://localhost:5000/api/",
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
});


export default api;

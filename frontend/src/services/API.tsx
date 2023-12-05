import axios from 'axios'

export default axios.create({
  baseURL:'https://bc136be.bootcamp64.tk',
  headers: {
    'content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

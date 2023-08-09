const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { error } = require('console');
//reqistered json details for access token
const filePath = path.join(__dirname, 'assets', 'reg.json');
const requestData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const Apireq = async () => {
    try {//api call for bearer token using axios
      const response = await axios.post('http://20.244.56.144/train/auth', requestData);
      const config = {
        headers: {
          "Authorization": "Bearer " + response.data.access_token,
        }
      };//api call for train data using axios 
      const d = await axios.get('http://20.244.56.144/train/trains', config);
      return d.data; // Return the data received from Axios
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  
  module.exports = Apireq;
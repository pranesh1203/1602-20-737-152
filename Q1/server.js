const axios = require('axios');
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'assets', 'reg.json');
const requestData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
//Making api call for bearer token using axios
axios.post('http://20.244.56.144/train/auth', requestData)
  .then(response => {
    const config={
        headers:{
            "Authorization": "Bearer "+response.data.access_token,
        }
    }
    //Making api call using bearer token for train data using axios
    axios.get('http://20.244.56.144/train/trains',config)
        .then(resp=>{
            console.log('Response:', resp.data);
        })
        .catch(error => {
            console.error('Error:1');
          });
  })
  .catch(error => {
    console.error('Error:', error);
  });

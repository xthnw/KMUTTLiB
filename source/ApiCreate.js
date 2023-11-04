const axios = require('axios');

// Define the API URL and JSON data
const apiUrl = 'http://localhost:8080/api/create';
const jsonData = {
  "Booking_Description" : "",
  "Booking_Status": "Reserved",
  "Booking_date": "15/10/2023",
  "Booking_period": "8:30 - 10:20",
  "Booking_for" : "CPE334",
  "Room_ID" : "KM5",
  "User_Email" : "Phongprawi.ratt@kmutt.ac.th",
  "User_1" : "nut",
  "User_2" : "fifa",
  "User_3" : "mesa",
  "User_4" : "kla",
  "User_5" : "beer",
  "User_6" : ""
};

// Send a POST request to the API
axios.post(apiUrl, jsonData)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
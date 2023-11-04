const axios = require('axios');

// Define the API URL
const apiUrl = 'http://localhost:8080/api/delete';

// Define the JSON data for the user's email
const jsonData = {
  "id": "Y0NJh2nDlT4bm3K6s4Ib"
};

// Export a function to make the delete request
function deleteBooking() {
  return axios({
    method: 'delete',
    url: apiUrl,
    data: jsonData,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

module.exports = { deleteBooking };
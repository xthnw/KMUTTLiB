// apiService.js
const axios = require('axios');

const fetchUserBookings = async (email) => {
    const apiUrl = 'http://localhost:8080/api/list';
    const jsonData = { "email": email };

    try {
        const response = await axios({
            method: 'get',
            url: apiUrl,
            data: jsonData,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const bookingData = response.data.data.booking;
        return bookingData;
    } catch (error) {
        throw error;
    }
};

module.exports = { fetchUserBookings };

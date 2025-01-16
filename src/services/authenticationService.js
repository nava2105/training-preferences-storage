const axios = require('axios');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const AUTH_URI = process.env.AUTH_URI;

// Service function to authenticate and process the response
const authenticate = async (token) => {
    try {
        // Send JSON payload with Authorization Bearer header
        const response = await axios.get(
            AUTH_URI,
            {
                headers: {
                    Authorization: token
                }
            }
        );

        // Log the processed response to the console
        if (response && response.data) {
            console.log(`No errors found during authentication`);
            return { success: true, data: response.data };
        } else {
            console.log('No response data received');
            return { error: 'No response data received' };
        }
    } catch (error) {
        // Catch and log errors
        console.error('Error during authentication:', error.message);
        return { error: error.message };
    }
};

module.exports = { authenticate };
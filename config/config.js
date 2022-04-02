const isDevelopment = __DEV__;

const DEVELOPMENT_APP_URL = 'http://localhost:3000';
const PRODUCTION_APP_URL = 'https://memeking.co.il';
const baseUrl = isDevelopment ? DEVELOPMENT_APP_URL : PRODUCTION_APP_URL;
const DEVELOPMENT_SERVER_API = 'http://localhost:8081/api';
const PRODUCTION_SERVER_API = 'https://memeking.co.il/api';

export default {
	baseUrl: baseUrl,
	apiBaseUrl: isDevelopment ? DEVELOPMENT_SERVER_API : PRODUCTION_SERVER_API,
};

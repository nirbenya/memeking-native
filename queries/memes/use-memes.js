import { useQuery } from 'react-query';
import axios from 'axios';
import config from '../../config/config';

const useMemes = ({ category }) => {
	return useQuery(['memes', category], () => {
		return axios.get(`${config.apiBaseUrl}/memes/category/${category}`).then(result => result.data);
	});
};

export default useMemes;

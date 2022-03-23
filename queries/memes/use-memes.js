import { useQuery } from 'react-query';
import axios from 'axios';

const URL = 'http://www.memeking.co.il/api';

const useMemes = ({ category }) => {
	return useQuery(['memes', category], () => {
		return axios.get(`${URL}/category/${category}`).then(result => result.data);
	});
};

export default useMemes;

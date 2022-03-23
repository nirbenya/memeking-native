import React from 'react';
import { Text, View } from 'react-native';
import Input from '../../components/Input/Input';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Gallery } from '../gallery/gallery';
import _ from 'lodash';
import Colors from '../../constants/Colors';

const useDebounce = (value, delay) => {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = React.useState(value);
	React.useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);
			// Cancel the timeout if value changes (also on delay change or unmount)
			// This is how we prevent debounced value from updating if value is changed ...
			// .. within the delay period. Timeout gets cleared and restarted.
			return () => {
				clearTimeout(handler);
			};
		},
		[value, delay], // Only re-call effect if value or delay changes
	);
	return debouncedValue;
};

const Search = ({ navigation }) => {
	const [searchTerm, setSearchTerm] = React.useState('');
	const debouncedValue = useDebounce(searchTerm, 500);

	const { data: memes = [], isLoading } = useQuery(
		['search', debouncedValue],
		() => {
			return axios.get(`http://www.memeking.co.il/api/search?search=${debouncedValue}`).then(res => res.data);
		},
		{ enabled: debouncedValue.length > 2 },
	);

	return (
		<View style={{ flex: 1, backgroundColor: Colors.brand }}>
			<Input
				value={searchTerm}
				onChange={value => setSearchTerm(value.toLowerCase())}
				clearButtonMode={'always'}
				placeholder={'חיפוש מם לפי מילת מפתח'}
			/>

			{isLoading ? (
				<Gallery isLoading={isLoading} />
			) : (
				<React.Fragment>
					{_.isEmpty(memes) ? (
						<React.Fragment>
							{debouncedValue ? <Text>no memes found</Text> : <Text>Search memes</Text>}
						</React.Fragment>
					) : (
						<Gallery
							onMemePress={id =>
								navigation.navigate('Generator', {
									key: 1,
									path: `memes/search/generator/normal/${id}`,
								})
							}
							isLoading={isLoading}
							memes={Object.values(memes)}
						/>
					)}
				</React.Fragment>
			)}
		</View>
	);
};

export default Search;

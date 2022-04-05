import React from 'react';
import { Image, View } from 'react-native';
import Input from '../../components/Input/Input';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Gallery } from '../gallery/gallery';
import _ from 'lodash';
import Colors from '../../constants/Colors';
import Text from '../../components/Text/Text';

import config from '../../config/config';

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
			return axios.get(`${config.apiBaseUrl}/search?search=${debouncedValue}`).then(res => res.data);
		},
		{ enabled: debouncedValue.length > 2 },
	);

	return (
		<View style={{ flex: 1, backgroundColor: Colors.brand }}>
			<View style={{ padding: 16 }}>
				<Input
					icon={'search'}
					autoFocus
					variant={'border-black'}
					shape={'round'}
					value={searchTerm}
					onChange={value => setSearchTerm(value.toLowerCase())}
					clearButtonMode={'always'}
					placeholder={'חיפוש'}
				/>
			</View>
			{isLoading ? (
				<Gallery isLoading={isLoading} />
			) : (
				<React.Fragment>
					{_.isEmpty(memes) ? (
						<View style={{ flex: 1, alignItems: 'center', paddingTop: 60 }}>
							{debouncedValue ? (
								<React.Fragment>
									<Text size={'xl'} bold variant={'white'}>
										לא נמצאו ממים
									</Text>
									<Text bold variant={'white'}>
										נסו מילה אחרת?
									</Text>
								</React.Fragment>
							) : (
								<View style={{ alignItems: 'center' }}>
									<Image style={{ width: 300, height: 200 }} source={require('./mag-2.png')} />
									<View style={{ alignItems: 'center' }}>
										<Text
											style={{ marginBottom: 8 }}
											align={'center'}
											bold
											variant={'white'}
											size={'xl'}
										>
											חיפוש ממים
										</Text>
										<Text variant={'white'} align={'center'}>
											חפשו ממים לפי טקסט או סוג
										</Text>
									</View>
								</View>
							)}
						</View>
					) : (
						<Gallery
							onMemePress={id =>
								navigation.navigate('Generator', {
									key: 1,
									path: `standalone-generator/normal/${id}`,
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

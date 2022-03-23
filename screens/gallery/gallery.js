import { StyleSheet, Image, ScrollView, TouchableHighlight } from 'react-native';
import React from 'react';
import colors from '../../constants/Colors';

import { Text, View } from '../../components/Themed';

import useMemes from '../../queries/memes/use-memes';
import MemeThumb from '../../components/meme-thumb/meme-thumb';
import Input from '../../components/Input/Input';
import SkeletonContent from 'react-native-skeleton-content';
import Colors from '../../constants/Colors';

export function Gallery({ memes, onMemePress, isLoading }) {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollView}>
				{isLoading ? (
					<SkeletonContent
						containerStyle={{
							flex: 1,
							flexDirection: 'row',
							flexWrap: 'wrap',
						}}
						isLoading
						layout={Array(30)
							.fill(30)
							.map(item => ({
								...styles.image,
								borderRadius: 0,
								borderColor: 'white',
								borderWidth: 1,
							}))}
					/>
				) : (
					memes.map(meme => {
						return (
							<TouchableHighlight onPress={() => onMemePress(meme.id)} key={meme.id} style={styles.image}>
								<MemeThumb src={meme.thumbPath} />
							</TouchableHighlight>
						);
					})
				)}
			</ScrollView>
		</View>
	);
}

const CategoryGallery = ({ route, navigation, category: propCategory, withFilter = true }) => {
	const category = propCategory || route.params.category;
	const { data: memes, isLoading } = useMemes({ category });
	const [searchText, setSearchText] = React.useState('');
	const onSearch = text => {
		setSearchText(text);
	};

	const memesArray = Object.values(memes || []);

	return (
		<View style={styles.container}>
			{withFilter && (
				<Input
					clearButtonMode={'always'}
					value={searchText}
					onChange={onSearch}
					placeholder={'חיפוש בקטגוריה'}
				/>
			)}
			<Gallery
				onMemePress={id =>
					navigation.navigate('Generator', {
						key: 1,
						path: `memes/${category}/generator/normal/${id}`,
					})
				}
				memes={memesArray.filter(meme => meme.description.toLowerCase().includes(searchText.toLowerCase()))}
				isLoading={isLoading}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.brand,
	},
	scrollView: {
		flexWrap: 'wrap',
		flexDirection: 'row',
	},
	image: {
		width: '33.333333333%',
		height: 120,
	},
});

export default CategoryGallery;

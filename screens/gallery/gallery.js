import {
	StyleSheet,
	Modal,
	View,
	Image,
	ScrollView,
	TouchableHighlight,
	ActivityIndicator,
	Pressable,
	TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import colors from '../../constants/Colors';

import Text from '../../components/Text/Text';

import useMemes from '../../queries/memes/use-memes';
import MemeThumb from '../../components/meme-thumb/meme-thumb';
import Input from '../../components/Input/Input';
import SkeletonContent from 'react-native-skeleton-content';
import Colors from '../../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';

const PreviewModal = ({ visible, meme, onHide }) => {
	const [isLoading, setIsLoading] = React.useState(true);
	React.useEffect(() => {
		if (!visible) {
			setIsLoading(true);
		}
	}, [visible]);
	return (
		<Modal animationType="fade" transparent={true} visible={visible}>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%',
					backgroundColor: `rgba(0, 0, 0, 0.8)`,
				}}
			>
				{isLoading ? <ActivityIndicator size={'large'} color={'#fff'} /> : null}
				<React.Fragment>
					<Image
						onLoad={() => setIsLoading(false)}
						source={{ uri: meme?.urlPath }}
						style={isLoading ? { height: 1, width: 1 } : { height: 350, width: 350, borderRadius: 8 }}
					/>
					{!isLoading && (
						<View
							style={{
								flexDirection: 'row',
								marginTop: 16,
								gap: '8px',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<FontAwesome color={'white'} size={20} name={'heart'} />
							<Text style={{ marginLeft: 8 }} variant={'white'} bold>
								{meme?.rating?.toLocaleString?.()}
							</Text>
						</View>
					)}
				</React.Fragment>
			</View>
		</Modal>
	);
};

export function Gallery({ memes, onMemePress, isLoading }) {
	const [activeMemePreviewModal, setActiveMemePreviewModal] = React.useState(null);

	return (
		<View style={styles.container}>
			<PreviewModal visible={!!activeMemePreviewModal} meme={activeMemePreviewModal} />
			<ScrollView
				alwaysBounceHorizontal={false}
				scrollEnabled={!activeMemePreviewModal}
				contentContainerStyle={styles.scrollView}
			>
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
							<TouchableHighlight
								pressRetentionOffset={{ top: 500, bottom: 500, left: 500, right: 500 }}
								onPressOut={event => {
									setActiveMemePreviewModal(null);
								}}
								onHide={() => setActiveMemePreviewModal(null)}
								onLongPress={() => setActiveMemePreviewModal(meme)}
								onPress={() => onMemePress(meme.id)}
								key={meme.id}
								style={styles.imageContainer}
							>
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
						path: `standalone-generator/normal/${id}`,
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
		backgroundColor: Colors.white,
		margin: -2,
	},
	scrollView: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageContainer: {
		width: '33%',
		margin: '0.05%',
		height: 120,
	},
});

export default CategoryGallery;

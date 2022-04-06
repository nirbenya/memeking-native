import { StyleSheet, Modal, View, Image, TouchableHighlight, ActivityIndicator, FlatList } from 'react-native';
import React from 'react';

import Text from '../../components/Text/Text';

import useMemes from '../../queries/memes/use-memes';
import MemeThumb, { MEME_THUMB_HEIGHT } from '../../components/meme-thumb/meme-thumb';
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
						<View style={{ marginTop: 16 }}>
							<View style={{ paddingHorizontal: 50 }}>
								<Text align={'center'} bold variant={'white'}>
									{meme?.description || ''}
								</Text>
							</View>
							<View
								style={{
									flexDirection: 'row',
									marginTop: 16,
									gap: '8px',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<FontAwesome color={'white'} size={13} name={'download'} />
								<Text style={{ marginLeft: 8 }} variant={'white'} bold>
									{meme?.rating?.toLocaleString?.() || ''}
								</Text>
							</View>
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
						.map(() => ({
							...styles.imageContainer,
							borderRadius: 0,
							borderColor: 'white',
							borderWidth: 1,
						}))}
				/>
			) : (
				<FlatList
					scrollEnabled={!activeMemePreviewModal}
					data={memes}
					numColumns={3}
					keyExtractor={meme => meme?.id}
					getItemLayout={(data, index) => ({
						length: MEME_THUMB_HEIGHT,
						offset: MEME_THUMB_HEIGHT * index,
						index,
					})}
					renderItem={({ item: meme }) => (
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
					)}
				/>
			)}
		</View>
	);
}

const CategoryGallery = ({ route, navigation, category: propCategory, withFilter = true }) => {
	const category = propCategory || route.params.category;
	const { data: memes = [], isLoading, isFetching } = useMemes({ category });
	const [searchText, setSearchText] = React.useState('');
	const onSearch = text => {
		setSearchText(text);
	};

	const memesArray = Object.values(memes || []);

	return (
		<View style={styles.container}>
			{withFilter && (
				<View
					style={{
						padding: 8,
						backgroundColor: 'white',
						shadowOffset: {
							width: 0,
							height: 4,
						},
						shadowOpacity: 0.1,
						shadowRadius: 4,
						zIndex: 9999,
					}}
				>
					<Input
						shape={'round'}
						variant={'border-black'}
						icon={'search'}
						clearButtonMode={'always'}
						value={searchText}
						onChange={onSearch}
						placeholder={'חיפוש בקטגוריה'}
					/>
				</View>
			)}
			<Gallery
				onMemePress={id =>
					navigation.navigate('Generator', {
						key: 1,
						path: `standalone-generator/normal/${id}`,
					})
				}
				memes={memesArray.filter(meme => meme.description.toLowerCase().includes(searchText.toLowerCase()))}
				isLoading={isLoading || isFetching}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		marginHorizontal: -2,
	},
	imageContainer: {
		width: '33%',
		margin: '0.05%',
		height: MEME_THUMB_HEIGHT,
	},
});

export default CategoryGallery;

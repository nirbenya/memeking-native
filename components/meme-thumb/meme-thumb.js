import { View, Image, StyleSheet } from 'react-native';

const backgroundVariants = ['#F8EBFF', '#67BAA7', '#F8EBFF', '#A783FF'];
export const MEME_THUMB_HEIGHT = 120;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MemeThumb = ({ src, style = {} }) => {
	return (
		<Image
			source={{ uri: src }}
			style={[
				styles.container,
				{ backgroundColor: backgroundVariants[getRandomInt(0, backgroundVariants.length - 1)] },
				style,
			]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		height: MEME_THUMB_HEIGHT,
	},
});

export default MemeThumb;

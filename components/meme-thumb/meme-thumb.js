import { View, Image, StyleSheet } from 'react-native';

const backgroundVariants = ['#95e1d3', '#eaffd0', '#fce38a', '#ff75a0'];

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MemeThumb = ({ src }) => {
	return (
		<Image
			source={{ uri: src }}
			style={[
				styles.container,
				{ backgroundColor: backgroundVariants[getRandomInt(0, backgroundVariants.length - 1)] },
			]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 120,
	},
});

export default MemeThumb;

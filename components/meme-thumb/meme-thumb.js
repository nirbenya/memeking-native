import { View, Image, StyleSheet } from 'react-native';

const MemeThumb = ({ src }) => {
	return <Image source={{ uri: src }} style={styles.container} />;
};

const styles = StyleSheet.create({
	container: {
		height: 120,
	},
});

export default MemeThumb;

import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.brand,
		height: 60,
		borderRadius: 8,
		width: width * 0.8,
		marginVertical: 10,
	},

	text: {
		color: 'white',
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center',
		fontSize: 20,
	},
});

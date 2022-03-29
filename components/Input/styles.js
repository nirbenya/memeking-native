import { StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		flex: 0,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	input: {
		height: 55,
		backgroundColor: Colors.white,
		color: 'black',
		width: '100%',
		textAlign: 'right',
		fontFamily: 'open-sans-hebrew',
	},
	icon: {
		position: 'absolute',
		left: 12,
		top: 16,
		zIndex: 9999,
		color: 'black',
	},
});

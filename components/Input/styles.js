import { StyleSheet } from 'react-native';

import { Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

export const variants = {
	normal: {
		borderRadius: 4,
	},
	'border-black': {
		borderColor: Colors.black,
		borderWidth: 1,
	},
};

export const sizes = {
	default: {
		height: 40,
	},
	xl: {
		height: 120,
	},
};

export const shapes = {
	round: {
		borderRadius: 24,
	},
};
export default StyleSheet.create({
	container: {
		flex: 0,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	input: {
		padding: 8,
		backgroundColor: Colors.white,
		color: 'black',
		width: '100%',
		textAlign: 'right',
		fontFamily: 'open-sans-hebrew',
	},
	icon: {
		position: 'absolute',
		left: 12,
		top: 10,
		zIndex: 9999,
		color: 'black',
	},
});

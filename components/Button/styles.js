import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export const variants = {
	brand: {
		button: {
			backgroundColor: Colors.white,
			activeColor: Colors.white,
		},
		text: {
			color: Colors.brand,
		},
	},
	secondary: {
		button: {
			backgroundColor: `rgba(0,0,0,0.2)`,
			activeColor: `rgba(0,0,0,0.3)`,
		},
		text: {
			color: Colors.white,
		},
	},
};

export const sizes = {
	xs: {
		button: {
			height: 24,
			paddingHorizontal: 6,
		},
		text: {
			fontSize: 12,
		},
	},
	lg: {
		button: {
			height: 60,
			marginVertical: 10,
		},
		text: {
			flex: 1,
			alignSelf: 'center',
			textAlign: 'center',
			fontSize: 20,
		},
	},
};

export default StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 30,
	},

	text: {
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center',
	},
});

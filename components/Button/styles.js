import { StyleSheet } from 'react-native';
import colors from '../../constants/Colors';

export const variants = {
	brand: {
		backgroundColor: colors.brand,
		activeColor: colors.brandDarken,
	},
	secondary: {
		backgroundColor: `rgba(0,0,0,0.2)`,
		activeColor: `rgba(0,0,0,0.3)`,
	},
};

export const sizes = {
	xs: {
		button: {
			height: 24,
			marginVertical: 10,
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
		backgroundColor: colors.brand,
		borderRadius: 8,
	},

	text: {
		color: 'white',
		flex: 1,
		alignSelf: 'center',
		textAlign: 'center',
	},
});

import React from 'react';
import { Text } from 'react-native';
import Colors from '../../constants/Colors';

const sizes = {
	sm: 14,
	xl: 32,
	xxl: 40,
};
export default ({ children, style, bold, variant, size = 'sm' }) => (
	<Text
		style={[
			{ fontFamily: `open-sans-hebrew${bold ? '-bold' : ''}` },
			{ color: Colors[variant], fontSize: sizes[size] },
			style,
		]}
	>
		{children}
	</Text>
);

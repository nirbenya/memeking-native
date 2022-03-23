import React from 'react';
import { Text } from 'react-native';
import Colors from '../../constants/Colors';

export default ({ children, style, bold, variant }) => (
	<Text style={[{ fontFamily: `open-sans-hebrew${bold ? '-bold' : ''}` }, { color: Colors[variant] }, style]}>
		{children}
	</Text>
);

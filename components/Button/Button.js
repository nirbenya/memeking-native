import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// components
import Text from '../Text/Text';

import styles, { variants, sizes } from './styles';

export default ({ children, onPress, icon, variant = 'brand', size = 'lg', block, style, disabled }) => {
	return (
		<TouchableHighlight
			disabled={disabled}
			style={[
				styles.button,
				variants[variant],
				sizes[size].button,
				block && { width: '100%' },
				style,
				disabled && { opacity: 0.5 },
			]}
			underlayColor={variants[variant].activeColor}
			onPress={onPress}
		>
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
				{icon && (
					<View style={{ marginRight: 10 }}>
						<FontAwesome name={icon} size={20} color={'white'} />
					</View>
				)}

				<Text bold style={[styles.text, sizes[size].text, icon ? { flex: 0 } : {}]}>
					{children}
				</Text>
			</View>
		</TouchableHighlight>
	);
};

import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// components
import Text from '../Text/Text';

import styles, { variants } from './styles';
import colors from '../../constants/Colors';

export default ({ children, onPress, icon, variant = 'brand' }) => {
	return (
		<View>
			<TouchableHighlight
				style={[styles.button, variants[variant]]}
				underlayColor={variants[variant].activeColor}
				onPress={onPress}
			>
				<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
					{icon && (
						<View style={{ marginRight: 10 }}>
							<FontAwesome name={icon} size={20} color={'white'} />
						</View>
					)}

					<Text bold style={[styles.text, icon ? { flex: 0 } : {}]}>
						{children}
					</Text>
				</View>
			</TouchableHighlight>
		</View>
	);
};

import React from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// style
import styles, { sizes, variants } from './styles';

const Input = ({ value, onChange, style, autoFocus, icon, variant, size = 'default', ...rest }) => {
	return (
		<View style={[styles.container, style]}>
			{icon && <FontAwesome size={20} name={icon} style={styles.icon} />}
			<TextInput
				autoFocus={autoFocus}
				placeholderTextColor={'black'}
				style={[styles.input, variants[variant], sizes[size]]}
				onChangeText={onChange}
				value={value}
				{...rest}
			/>
		</View>
	);
};

export default Input;

import React from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// style
import styles, { sizes, variants, shapes } from './styles';

const Input = ({ value, onChange, style, autoFocus, icon, variant, size = 'default', shape, ...rest }) => {
	return (
		<View style={[styles.container, style]}>
			{icon && <FontAwesome size={20} name={icon} style={styles.icon} />}
			<TextInput
				autoFocus={autoFocus}
				placeholderTextColor={'black'}
				style={[styles.input, variants[variant], sizes[size], shapes[shape]]}
				onChangeText={onChange}
				value={value}
				{...rest}
			/>
		</View>
	);
};

export default Input;

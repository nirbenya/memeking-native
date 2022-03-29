import React from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// style
import styles from './styles';

const Input = ({ value, onChange, style, autoFocus, ...rest }) => {
	return (
		<View style={[styles.container, style]}>
			<FontAwesome size={20} name={'search'} style={styles.icon} />
			<TextInput
				autoFocus={autoFocus}
				placeholderTextColor={'black'}
				style={styles.input}
				onChangeText={onChange}
				value={value}
				{...rest}
			/>
		</View>
	);
};

export default Input;

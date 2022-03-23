import React from 'react';
import { TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// style
import styles from './styles';

const Input = ({ value, onChange, ...rest }) => {
	return (
		<View style={styles.container}>
			<FontAwesome size={20} name={'search'} style={styles.icon} />
			<TextInput
				placeholderTextColor={'white'}
				style={styles.input}
				onChangeText={onChange}
				value={value}
				{...rest}
			/>
		</View>
	);
};

export default Input;

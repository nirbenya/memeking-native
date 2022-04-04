import React from 'react';
import { TouchableHighlight, Image, View } from 'react-native';

// components
import Text from '../../components/Text/Text';

import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white',
		padding: 10,
		borderRadius: 15,
		shadowColor: Colors.brand,
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		marginBottom: 8,
	},

	innerContainer: {
		flex: 1,
		alignSelf: 'stretch',
		alignItems: 'flex-end',
		justifyContent: 'space-between',
	},

	icon: {
		width: 30,
		height: 30,
		borderRadius: 22,
	},

	text: {
		fontSize: 18,
		color: Colors.black,
	},

	label: {
		width: 10,
		height: 10,
		marginRight: 10,
		position: 'absolute',
		bottom: -20,
		right: 0,
	},
});

export default ({ title, onPress, icon }) => {
	return (
		<TouchableHighlight
			style={{
				borderRadius: 12,
				width: '49%',
				height: 90,
			}}
			underlayColor={'rgba(255,255,255,0.5)'}
			onPress={onPress}
		>
			<View style={[styles.container]}>
				<View style={styles.innerContainer}>
					<Image style={styles.icon} source={icon} />
					<View
						style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}
					>
						<Text style={styles.text}>{title}</Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};

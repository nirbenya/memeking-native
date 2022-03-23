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
		backgroundColor: 'rgba(0,0,0,0.2)',
		padding: 15,
		paddingHorizontal: 22,
		borderRadius: 8,
	},

	innerContainer: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	icon: {
		width: 45,
		height: 45,
		borderRadius: 22,
	},

	text: {
		fontSize: 18,
		color: 'white',
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
				marginHorizontal: 16,
				marginBottom: 8,
				borderRadius: 8,
			}}
			underlayColor={'rgba(0,0,0,0.2)'}
			onPress={onPress}
		>
			<View style={[styles.container, { height: 65 }]}>
				<View style={styles.innerContainer}>
					<Image style={styles.icon} source={icon} />
					<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
						<Text bold style={styles.text}>
							{title}
						</Text>
					</View>
				</View>
			</View>
		</TouchableHighlight>
	);
};

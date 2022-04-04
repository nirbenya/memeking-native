import React from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import MenuItem from './menu-item';
import menu from './menu';
import Colors from '../../constants/Colors';

const Categories = ({ navigation }) => {
	return (
		<ScrollView
			contentContainerStyle={{
				paddingBottom: 40,
				flexWrap: 'wrap',
				flexDirection: 'row',
				justifyContent: 'space-between',

				paddingHorizontal: 16,
			}}
			style={styles.container}
		>
			{Object.values(menu).map(item => (
				<MenuItem
					key={item.name}
					{...item}
					onPress={() =>
						navigation.navigate({
							name: 'CategoryGallery',
							key: 'categories',
							params: { category: item.name, isInputShown: true },
						})
					}
				/>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingTop: 16,
	},
});

export default Categories;

import { StyleSheet, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Button from '../components/Button/Button';
import * as ImagePicker from 'expo-image-picker';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			aspect: [4, 3],
			quality: 1,
			base64: true,
		});

		if (!result.cancelled) {
			//@ts-ignore
			navigation.navigate({
				name: 'Generator',
				key: 'generator-upload',
				params: { mode: 'upload', image: result.base64 },
			});
			//alert(JSON.stringify(result.base64).slice(0, 100));
		}
	};
	return (
		<View style={styles.container}>
			<Image style={{ width: 100, height: 100 }} source={require('../assets/images/app-icon.png')} />

			<Button onPress={pickImage}>העלאת תמונה</Button>
			<Button
				onPress={() =>
					navigation.navigate({ name: 'Generator', key: 'clean-slate', params: { mode: 'clean' } })
				}
			>
				לוח חלק
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});

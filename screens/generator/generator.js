import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import BaseWebview from '../../components/webview/webview';
import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const modes = {
	upload: {
		path: 'generator/cropper/upload/normalFormat',
		getInjectedJs: ({ image } = {}) => `window.cropperImage = '${image}';`,
	},
	clean: {
		path: 'generator/clean-slate/111',
	},
};

export default function Generator({ route }) {
	const mode = route.params.mode;
	const image = route.params.image;

	const onSave = async event => {
		const data = event.nativeEvent.data;
		const base64Code = data.split('data:image/png;base64,')[1];

		const filename = FileSystem.documentDirectory + 'memeking.png';

		const permission = await MediaLibrary.requestPermissionsAsync();

		if (permission.status === 'granted') {
			try {
				await FileSystem.writeAsStringAsync(filename, base64Code, {
					encoding: FileSystem.EncodingType.Base64,
				});

				await MediaLibrary.saveToLibraryAsync(filename);

				alert('המם נשמר בהצלחה');
			} catch (e) {
				alert('לא הצלחנו לשמור את המם. נסו ללכת להגדרות ולתת הרשאות לאפליקציה');
			}
		} else {
			alert('איך נשמור מם בלי הרשאות אבאלה?');
		}
	};

	return (
		<View style={styles.container}>
			<BaseWebview
				onMessage={onSave}
				path={modes[mode].path}
				injectedJavaScript={modes[mode]?.getInjectedJs?.({ image })}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

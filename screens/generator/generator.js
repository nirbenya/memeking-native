import { Alert, StyleSheet, View } from 'react-native';

import BaseWebview from '../../components/webview/webview';
import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const modes = {
	upload: {
		path: 'standalone-generator/cropper/111',
		getInjectedJs: ({ image } = {}) => `window.cropperImage = '${image}';`,
	},
	clean: {
		path: 'standalone-generator/clean-slate/111',
	},
};
import * as Sharing from 'expo-sharing';

const getBase64ImageFromRawData = raw => {
	return raw.split('data:image/png;base64,')[1];
};

export default function Generator({ route }) {
	const mode = route.params.mode;
	const image = route.params.image;
	const path = route.params.path;

	const onDownload = async data => {
		const base64Code = getBase64ImageFromRawData(data);

		const filename = FileSystem.documentDirectory + 'memeking.png';

		const permission = await MediaLibrary.requestPermissionsAsync();

		if (permission.status === 'granted') {
			try {
				await FileSystem.writeAsStringAsync(filename, base64Code, {
					encoding: FileSystem.EncodingType.Base64,
				});

				await MediaLibrary.saveToLibraryAsync(filename);

				Alert.alert('מברוק', 'המם נשמר בהצלחה לגלריה');
			} catch (e) {
				Alert.alert('אוי', 'לא הצלחנו לשמור את המם. נסו ללכת להגדרות ולתת הרשאות לאפליקציה');
			}
		} else {
			Alert.alert('אוי', 'איך נשמור מם בלי הרשאות אבאלה? תנו לי הרשאות בהגדרות של האייפון');
		}
	};

	const onShare = async data => {
		const filename = FileSystem.documentDirectory + 'memeking.png';
		const base64Code = getBase64ImageFromRawData(data);

		const permission = await MediaLibrary.requestPermissionsAsync();

		if (permission.status === 'granted') {
			try {
				await FileSystem.writeAsStringAsync(filename, base64Code, {
					encoding: FileSystem.EncodingType.Base64,
				});
			} catch (e) {
				Alert.alert('אוי', 'לא הצלחנו לשתף את המם. נסו ללכת להגדרות ולתת הרשאות לאפליקציה');
			}
		} else {
			Alert.alert('אוי', 'איך נשתף מם בלי הרשאות אבאלה? תנו לי הרשאות בהגדרות של האייפון');
		}

		await Sharing.shareAsync(FileSystem.documentDirectory + `memeking_${new Date().getTime()}.png`);
	};

	const onPostMessage = event => {
		const data = event.nativeEvent.data;
		const { value, type } = JSON.parse(data || '{}') || {};

		if (type === 'MEME_DOWNLOAD') {
			onDownload(value);
		} else if (type === 'MEME_SHARE') {
			onShare(value);
		}
	};

	return (
		<View style={styles.container}>
			<BaseWebview
				onMessage={onPostMessage}
				path={path || modes[mode].path}
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

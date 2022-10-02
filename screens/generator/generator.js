import { Alert, StyleSheet, View } from 'react-native';

import BaseWebview from '../../components/webview/webview';
import React from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

const getBase64ImageFromRawData = raw => {
	return raw.split('data:image/png;base64,')[1];
};

const modes = {
	upload: {
		path: 'standalone-generator/cropper/111',
		getInjectedJs: ({ image } = {}) => `window.cropperImage = '${image}';`,
	},
	clean: {
		path: 'standalone-generator/clean-slate/111',
	},
};

export default function Generator({ route }) {
	const mode = route.params.mode;
	const image = route.params.image;
	const path = route.params.path;

	const onSave = async data => {
		const base64Code = data.split('data:image/png;base64,')[1];

		const filename = FileSystem.documentDirectory + 'memeking.png';

		const permission = await MediaLibrary.requestPermissionsAsync();
		if (permission.status === 'granted') {
			try {
				try {
					await FileSystem.deleteAsync(FileSystem.documentDirectory);
				} catch (e) {
					console.log('could not delete folder of previous stuff');
				}
				await FileSystem.writeAsStringAsync(filename, base64Code, {
					encoding: FileSystem.EncodingType.Base64,
				});

				await MediaLibrary.saveToLibraryAsync(filename);

				Alert.alert('מברוק', 'המם נשמר בהצלחה לגלריה');
			} catch (e) {
				Alert.alert('אוי', 'מאיזושהי סיבה לה הצלחנו לשמור את המם, פנו אלינו במייל: nirbenya@gmail.com');
			}
		} else {
			Alert.alert('אוי', 'איך נשמור מם בלי הרשאות אבאלה? תנו לי הרשאות בהגדרות של המכשיר');
		}
	};

	const onShare = async data => {
		const filename = FileSystem.documentDirectory + 'memeking.png';
		const base64Code = getBase64ImageFromRawData(data);

		try {
			try {
				await FileSystem.deleteAsync(FileSystem.documentDirectory);
			} catch (e) {
				console.log('could not delete folder of previous stuff');
			}
			await FileSystem.writeAsStringAsync(filename, base64Code, {
				encoding: FileSystem.EncodingType.Base64,
			});
		} catch (e) {
			Alert.alert('אוי', 'לא הצלחנו לשתף את המם. ');
		}

		await Sharing.shareAsync(filename);
	};

	const onPostMessage = event => {
		let data = event.nativeEvent.data;
		let value, postMessageType;

		// for backward compatability. we check if postMessage has a type (postMessageType).
		// if it has we check the type and send to the correct action function.
		// if not - moving to default flow of downloading a meme a meme.
		try {
			const objectData = JSON.parse(data || '{}') || {};
			postMessageType = objectData.postMessageType;
			value = objectData.value;
		} catch (e) {
			data = event.nativeEvent.data;
		}

		if (postMessageType) {
			if (postMessageType === 'MEME_SHARE') {
				onShare(value);
			}
		} else {
			onSave(data);
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

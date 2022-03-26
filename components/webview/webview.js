import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const BaseWebview = React.forwardRef(({ path = '', injectedJavaScript, ...rest }, ref) => {
	return (
		<View style={styles.container}>
			<WebView
				ref={ref}
				style={{ flex: 1, flexGrow: 1 }}
				injectedJavaScriptBeforeContentLoaded={`
                     window.isNativeApp = true;
                     
                     ${injectedJavaScript};
                       
                     `}
				source={{ uri: `https://www.memeking.co.il/${path}` }}
				{...rest}
			/>
		</View>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});

export default BaseWebview;

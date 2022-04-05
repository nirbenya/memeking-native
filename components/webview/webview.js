import { WebView } from 'react-native-webview';
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import config from '../../config/config';

const BaseWebview = React.forwardRef(({ path = '', injectedJavaScript, ...rest }, ref) => {
	const [isLoading, setIsLoading] = React.useState(true);
	const scalesPageToFit = Platform.OS === 'android';

	return (
		<View style={styles.container}>
			{isLoading && (
				<View
					style={{
						height: '100%',
						flex: 1,
						flexGrow: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: Colors.gray90,
					}}
				>
					<ActivityIndicator size={'large'} color={'gray'} />
				</View>
			)}
			<WebView
				scalesPageToFit={scalesPageToFit}
				scrollEnabled={false}
				onLoadEnd={() => setIsLoading(false)}
				ref={ref}
				style={{ opacity: 0.99 }}
				containerStyle={{ flex: isLoading ? 0 : 1, height: isLoading ? 1 : 0 }}
				injectedJavaScriptBeforeContentLoaded={`
                     window.isNativeApp = true;
                     window.nativeAppPlatform = "android";
                     
                     ${injectedJavaScript || ''};
                       
                     `}
				source={{ uri: `${config.baseUrl}/${path}` }}
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

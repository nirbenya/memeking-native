import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	// Load any resources or data that we need prior to rendering the app
	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync();

				// Load fonts
				await Font.loadAsync({
					...FontAwesome.font,
					'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
					'open-sans-hebrew': require('../assets/fonts/OpenSansHebrew-Regular.ttf'),
					'open-sans-hebrew-bold': require('../assets/fonts/OpenSansHebrew-Bold.ttf'),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				// let the user enjoy our beautiful splash screen for 1 more sec
				setTimeout(() => {
					setLoadingComplete(true);
					SplashScreen.hideAsync();
				}, 1000);
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return isLoadingComplete;
}

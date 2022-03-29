import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
import * as Updates from 'expo-updates';
import React from 'react';
import { Alert } from 'react-native';
import AppStateTracker from './services/app-state-tracker';

export const checkForUpdatedJavascriptBundle = async () => {
	try {
		const update = await Updates.checkForUpdateAsync();
		if (update.isAvailable) {
			await Updates.fetchUpdateAsync();
			Alert.alert('יש עדכון!', 'מתבצע עדכון של האפליקציה');

			Updates.reloadAsync();
		}
	} catch (e) {
		// handle or log error
	}
};

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	React.useEffect(() => {
		checkForUpdatedJavascriptBundle();
	}, []);

	if (!isLoadingComplete) {
		return null;
	} else {
		return (
			<SafeAreaProvider>
				<QueryClientProvider client={queryClient}>
					<Navigation colorScheme={colorScheme} />
					<AppStateTracker onComingFromBackgroundToForeground={checkForUpdatedJavascriptBundle} />
					<StatusBar />
				</QueryClientProvider>
			</SafeAreaProvider>
		);
	}
}

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ActivityIndicator, View } from 'react-native';
import Text from './components/Text/Text';

const queryClient = new QueryClient();
import * as Updates from 'expo-updates';
import React from 'react';
import AppStateTracker from './services/app-state-tracker';
import Colors from './constants/Colors';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();
	const [isUpdatingNewBundle, setIsUpdatingNewBundle] = React.useState(false);
	React.useEffect(() => {
		checkForUpdatedJavascriptBundle();
	}, []);

	const checkForUpdatedJavascriptBundle = async () => {
		try {
			console.log('trying to get updates');

			const update = await Updates.checkForUpdateAsync();
			if (update.isAvailable) {
				setIsUpdatingNewBundle(true);
				await Updates.fetchUpdateAsync();
				Updates.reloadAsync();
			} else {
				console.log('no update available');
			}
		} catch (e) {
			console.log('error getting updates');
		} finally {
			setIsUpdatingNewBundle(false);
		}
	};

	if (!isLoadingComplete) {
		return null;
	}

	if (isUpdatingNewBundle) {
		// @ts-ignore
		return (
			<SafeAreaProvider>
				<View
					style={{
						flex: 1,
						padding: 100,
						backgroundColor: Colors.brand,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<View>
						<Text style={{ textAlign: 'center' }} variant={'white'} size={'xl'}>
							מעדכנים לגרסה החדשה ביותר
						</Text>
						<View style={{ marginTop: 16 }}>
							<ActivityIndicator color={'white'} size={'large'} />
						</View>
					</View>
				</View>
			</SafeAreaProvider>
		);
	}

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

import React, { useRef, useState, useEffect } from 'react';
import { AppState, StyleSheet, Text, View } from 'react-native';

const AppStateTracker = ({ onComingFromBackgroundToForeground }) => {
	const appState = useRef(AppState.currentState);
	const [appStateVisible, setAppStateVisible] = useState(appState.current);

	useEffect(() => {
		AppState.addEventListener('change', handleAppStateChange);

		return () => {
			AppState.removeEventListener('change', handleAppStateChange);
		};
	}, []);

	const handleAppStateChange = nextAppState => {
		if (appState.current.match(/background/) && nextAppState === 'active') {
			onComingFromBackgroundToForeground();
		}

		appState.current = nextAppState;
		setAppStateVisible(appState.current);
		console.log('AppState', appState.current);
	};

	return null;

	return (
		<View style={styles.container}>
			<Text>Current state is: {appStateVisible}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default AppStateTracker;

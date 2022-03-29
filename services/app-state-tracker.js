import React, { useRef, useEffect } from 'react';
import { AppState } from 'react-native';

const AppStateTracker = ({ onComingFromBackgroundToForeground }) => {
	const appState = useRef(AppState.currentState);

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
		// setAppStateVisible(appState.current);
		console.log('AppState', appState.current);
	};

	return null;
};

export default AppStateTracker;

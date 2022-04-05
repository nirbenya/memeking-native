/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';
import Colors from '../constants/Colors';
import NotFoundScreen from '../screens/NotFoundScreen';
import Home from '../screens/home/home';
import LinkingConfiguration from './LinkingConfiguration';
import Generator from '../screens/generator/generator';
import Categories from '../screens/categories/categories';
import CategoryGallery from '../screens/gallery/gallery';
import PopularContainer from '../screens/popular/popular-container';
import Search from '../screens/search/search';
import BugsPage from '../screens/bugs-page/bugs-page';
import menu from '../screens/categories/menu';
import ModalScreen from '../screens/ModalScreen';
export default function Navigation({ colorScheme }) {
	return (
		<NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
			<Stack.Screen
				options={{
					headerTitleStyle,
					headerStyle: { backgroundColor: Colors.brand },
					headerBackTitleStyle: { color: 'white' },
					headerBackTitle: 'חזרה',
					headerTintColor: 'white',
					title: 'יצירת מם',
				}}
				name="Generator"
				component={Generator}
			/>
			<Stack.Screen
				options={({ route }) => ({
					headerTitleStyle,
					headerStyle: { backgroundColor: Colors.brand },
					headerBackTitleStyle: { color: 'white' },
					headerBackTitle: 'חזרה',
					headerTintColor: 'white',
					title: menu[route.params.category]?.title,
				})}
				name="CategoryGallery"
				component={CategoryGallery}
			/>
			<Stack.Screen
				options={{
					headerTitleStyle,
					headerStyle: { backgroundColor: Colors.brand },
					headerBackTitleStyle: { color: 'white' },
					headerBackTitle: 'חזרה',
					headerTintColor: 'white',
					title: '',
				}}
				name="BugsPage"
				component={BugsPage}
			/>

			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();

const headerTitleStyle = { color: 'white', fontFamily: 'open-sans-hebrew-bold' };

function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			initialRouteName="Home"
			screenOptions={{
				tabBarStyle: {
					backgroundColor: Colors.brand,
					borderTopWidth: 1,
					borderTopColor: 'white',
				},
				tabBarLabelStyle: { fontFamily: 'open-sans-hebrew', fontSize: 12 },
				tabBarActiveTintColor: Colors.brandLight,
				tabBarInactiveTintColor: 'white',
				headerStyle: { backgroundColor: Colors.brand, borderBottomColor: 'white', borderBottomWidth: 1 },
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={({ navigation }) => ({
					title: 'מימ קינג',
					headerTitleStyle,
					tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
					// headerRight: () => (
					// 	<Pressable
					// 		onPress={() => navigation.navigate('Modal')}
					// 		style={({ pressed }) => ({
					// 			opacity: pressed ? 0.5 : 1,
					// 		})}
					// 	>
					// 		<FontAwesome name="info-circle" size={25} color={'white'} style={{ marginRight: 15 }} />
					// 	</Pressable>
					// ),
				})}
			/>
			<BottomTab.Screen
				name="Popular"
				component={PopularContainer}
				options={{
					headerTitleStyle,

					title: 'פופולאריים',
					tabBarIcon: ({ color }) => <TabBarIcon name="trophy" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="New"
				component={CategoryGallery}
				initialParams={{ category: 'new-memes' }}
				options={{
					headerTitleStyle,

					title: 'חדשים',
					tabBarIcon: ({ color }) => <TabBarIcon name="bolt" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Categories"
				component={Categories}
				options={{
					headerTitleStyle,

					title: 'קטגוריות',
					tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="Search"
				component={Search}
				options={{
					headerTitleStyle,

					title: 'חיפוש',
					tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props) {
	return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

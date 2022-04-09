import React from 'react';
import { TouchableHighlight, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import CategoryGallery from '../gallery/gallery';
import Colors from '../../constants/Colors';
import Text from '../../components/Text/Text';

const Tab = ({ children, active, onPress, style }) => {
	return (
		<TouchableHighlight
			onPress={onPress}
			activeOpacity={0.9}
			underlayColor="transparent"
			style={{
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: active ? Colors.brandDarken : Colors.gray90,
				flex: 1,
				...style,
			}}
		>
			<View style={{ height: 48, justifyContent: 'center', alignItems: 'center' }}>
				<Text bold variant={active ? 'white' : 'gray30'}>
					{children}
				</Text>
			</View>
		</TouchableHighlight>
	);
};
const PopularContainer = ({ navigation }) => {
	const [tab, setTab] = React.useState('popular');
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: 8,
				}}
			>
				<Tab
					style={{ borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
					onPress={() => setTab('all-time-popular')}
					active={tab === 'all-time-popular'}
				>
					בכל הזמנים
				</Tab>
				<Tab onPress={() => setTab('popular')} active={tab === 'popular'}>
					השבוע
				</Tab>
				<Tab
					style={{ borderTopRightRadius: 8, borderBottomRightRadius: 8 }}
					onPress={() => setTab('daily-popular')}
					active={tab === 'daily-popular'}
				>
					היום
				</Tab>
			</View>
			{tab === 'popular' && <CategoryGallery withFilter={false} category={'popular'} navigation={navigation} />}
			{tab === 'all-time-popular' && (
				<CategoryGallery withFilter={false} category={'all-time-popular'} navigation={navigation} />
			)}
			{tab === 'daily-popular' && (
				<CategoryGallery withFilter={false} category={'daily-popular'} navigation={navigation} />
			)}
		</View>
	);
};

export default PopularContainer;

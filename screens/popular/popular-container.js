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
				borderColor: active ? Colors.brand : Colors.gray80,
				borderBottomWidth: 3,
				flex: 1,
				...style,
			}}
		>
			<View style={{ height: 48, justifyContent: 'center', alignItems: 'center' }}>
				<Text bold variant={active ? 'brand' : 'gray30'}>
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
				}}
			>
				<Tab
					style={{ borderRightWidth: 1, borderRightColor: Colors.gray80 }}
					onPress={() => setTab('all-time-popular')}
					active={tab === 'all-time-popular'}
				>
					הפופולואריים בכל הזמנים
				</Tab>
				<Tab onPress={() => setTab('popular')} active={tab === 'popular'}>
					הפופולואריים השבוע
				</Tab>
			</View>
			{tab === 'popular' && <CategoryGallery withFilter={false} category={'popular'} navigation={navigation} />}
			{tab === 'all-time-popular' && (
				<CategoryGallery withFilter={false} category={'all-time-popular'} navigation={navigation} />
			)}
		</View>
	);
};

export default PopularContainer;

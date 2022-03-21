import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

// components
import Text from '../Text/Text';

import styles from './styles';
import colors from '../../constants/Colors';

export default ({ children, onPress,  icon}) => {

    return(
    <View >
        <TouchableHighlight  style={styles.button} underlayColor={colors.brandDarken} onPress={onPress} >
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}} >
                {icon && (
                    <View style={{marginRight: 10, position: 'relative', top: 3}}>
                        <Ionicons
                            name={icon}
                            size={20}
                            color={'white'}
                        />
                    </View>
                )}

                <Text bold style={[styles.text, icon ? { flex: 0, width: 180 , textAlign: 'right'} : {}]}>{children}</Text>

            </View>
        </TouchableHighlight>
    </View>

    )
}
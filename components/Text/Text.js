import React from 'react';
import { Text } from 'react-native';

export default ({ children, style, bold }) => (
    <Text style={[{fontFamily: `open-sans-hebrew${bold ? '-bold' : ''}`}, style]}>{children}</Text>
)
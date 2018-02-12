import React from 'react'
import { View, Text } from 'react-native'
import styles from './Styles/ScheduleSectionHeaderStyle'

export default class ScheduleSectionHeader extends React.PureComponent {
    render() {
        const { time } = this.props;
        return (
            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.headerTime}>{time}</Text>
            </View>
        )
    }
}

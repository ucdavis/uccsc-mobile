import React from 'react';
import { View, Text } from 'react-native';
import styles from './Styles/RoomInfoStyle';

const RoomInfo = (props) => {
  const { building, room } = props;

  if (!building && !room) {
    return null;
  }

  return (
    <View style={styles.container}>
      { building &&
        <View
          style={styles.detail}
          accessible
          accessibilityLabel={`Building: ${building}.`}
        >
          <Text style={styles.detailLabel}>
            Building
          </Text>
          <Text style={styles.detailText}>
            { building }
          </Text>
        </View>
      }
      { room && 
        <View
          style={styles.detail}
          accessible
          accessibilityLabel={`Room: ${room}.`}
        >
          <Text style={styles.detailLabel}>
            Room
          </Text>
          <Text style={styles.detailText}>
            { room }
          </Text>
        </View>
      }
    </View>
  );
};

export default RoomInfo;

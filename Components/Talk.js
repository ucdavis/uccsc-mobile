import React from "react";
import { View, Text, Image } from "react-native";
import TalkInfo from "./TalkInfo";
import styles from "./Styles/TalkStyle";

export default class Talk extends React.Component {
  render() {
    const {
      name,
      title,
      avatarURL,
      start,
      duration,
    } = this.props;

    return (
      <View>
        <View style={styles.info}>
          <View style={styles.infoText}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Image style={styles.avatar} source={{ uri: avatarURL }} />
        </View>
        <TalkInfo
          start={start}
          duration={duration}
        />
      </View>
    );
  }
}

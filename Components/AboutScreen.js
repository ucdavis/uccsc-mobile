import React from "react";
import { Animated, Button, Image, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Svg } from "expo";
import { Images } from "../Themes";
import styles from "./Styles/AboutScreenStyle";

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: "General Info",
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="map" size={24} color="black" />
    )
  };

  constructor(props) {
    super(props);

    this.state = { circleRadius: new Animated.Value(45) };

    this.state.circleRadius.addListener(r => {
      this._myCircle.setNativeProps({ r: r.value.toString() });
    });

  }
  
  _animate = () => {
    // make the radius 100 after 2 seconds
    Animated.spring(this.state.circleRadius, {
      toValue: 100,
      friction: 3
    }).start();
  };

  render() {
    const fill = "#f1c40f";
    let AnimatedCircle = Animated.createAnimatedComponent(Svg.Circle);
    return (
      <View style={styles.container}>
        <Button onPress={this._animate} title="Animate" />
        <Text style={styles.sectionText}>About Screen</Text>
        <View>
          <Svg height={250} width={250}>
            <AnimatedCircle
              ref={r => (this._myCircle = r)}
              cx={125}
              cy={125}
              r={45}
              strokeWidth={2.5}
              stroke="#e74c3c"
              fill={fill}
            />
          </Svg>
        </View>
      </View>
    );
  }
}

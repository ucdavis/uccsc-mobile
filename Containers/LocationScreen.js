import React from 'react';
import {
  Animated,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import { MapView } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';
import { withTimer } from '../Helpers/WithTimer';
import { addActionListener } from '../Services/NavigationService';

import { Colors, Images, Metrics } from '../Themes';
import Gradient from '../Components/Gradient';
import Gallery from '../Components/Gallery';
import styles from './Styles/LocationScreenStyle';

class LocationScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.navigationFocusListener = addActionListener((payload) => this.onNavigationChanged(payload));

    if (this.props.navigation.isFocused()) {
      this.accessibilityFocusTop();
    }
  }

  componentWillUnmount() {
    if (this.navigationFocusListener) {
      this.navigationFocusListener.remove();
    }
  }

  onNavigationChanged = (payload) => {
    if (payload.key === 'Location') {
      this.accessibilityFocusTop();
    }
  }

  accessibilityFocusTop = () => {
    this.props.timer.setTimeout(() => accessibilityFocusRef(this._directionsLink), 100);
  }

  openMaps = async (daddr = '550+Alumni+Ln+Davis+CA+95616') => {
    const googleMaps = `geo://?daddr=${daddr}`;
    const appleMaps = `http://maps.apple.com?daddr=${daddr}`;

    let supported = await Linking.canOpenURL(googleMaps);
    if (supported) {
      Linking.openURL(googleMaps);
      return;
    }

    supported = await Linking.canOpenURL(appleMaps);
    if (supported) {
      Linking.openURL(appleMaps);
      return;
    }
  }

  
  renderBackground() {
    const height = Metrics.locationBackgroundHeight;
    const { scrollY } = this.state;

    const style = [
      styles.venue,
      {
        position: 'absolute',
        height,
        width: '100%',
        backgroundColor: Colors.darkBlue1,
        opacity: scrollY.interpolate({
          inputRange: [-height, 0, height],
          outputRange: [1, 1, 0],
        }),
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [-height, 0, height],
            outputRange: [-height * 0.9, 0, 0],
          }),
        }, {
          scale: scrollY.interpolate({
            inputRange: [-height, 0, height],
            outputRange: [1.3, 1.5, 2],
          }),
        }],
      },
    ];

    return (
      <Animated.Image
        style={style}
        source={Images.Arboretum}
        resizeMode="cover"
        accessibilityElementsHidden
        importantForAccessibility='no'
      />
    );
  }

  renderHeader() {
    const height = Metrics.locationBackgroundHeight - 24;
    const { scrollY } = this.state;

    const style = [
      {
        position: 'relative',
        height,
        padding: 0,
        opacity: scrollY.interpolate({
          inputRange: [-height, 0, height * 0.4, height * 0.9],
          outputRange: [1, 1, 1, 0],
        }),
        transform: [{
          translateY: scrollY.interpolate({
            inputRange: [-height, 0, height * 0.45, height],
            outputRange: [0, 0, height * 0.45, height * 0.4],
          }),
        }],
      }
    ]
    return (
      <Animated.View
        style={style}
        accessibilityElementsHidden
        importantForAccessibility='no-hide-descendants'
      >
        <View style={styles.headingContainer}>
          <Text style={styles.mainHeading}>UC Davis</Text>
          <Text style={styles.address}>
            Conference Center{'\n'}
            550 Alumni Ln{'\n'}
            Davis, CA 95616
          </Text>
        </View>
      </Animated.View>
    );
  }

  render() {
    return (
      <Gradient style={styles.container}>
        <Animated.ScrollView
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          { this.renderBackground() }
          { this.renderHeader() }
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 38.53,
              longitude: -121.75,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            rotateEnabled={false}
            accessibilityElementsHidden
            importantForAccessibility='no-hide-descendants'
          />
          <View style={styles.mapActions}>
            <TouchableOpacity
              onPress={() => this.openMaps()}
              style={styles.getDirections}
              accessible
              accessibilityLabel={`The UCCSC Conference is located at the UC Davis Conference Center on 550 Alumni Ln, Davis, CA 95616. Click to open on maps.`}
              accessibilityTraits='button'
              accessibilityComponentType='button'
              ref={r => this._directionsLink = r}
            >
              <View style={styles.addressContainer}>
                <Text style={styles.venueName}>
                  UC Davis
                </Text>
                <Text style={styles.venueAddress}>
                  550 Alumni Ln{'\n'}Davis, CA 95616
                </Text>
              </View>
              <View style={styles.directionsIcon}>
                <MaterialIcons name="directions" size={24} color="black" />
                <Text style={styles.directionsLabel}>Directions</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionHeader}
            accessible
            accessibilityLabel='Nearby food and drink'
          >
            <Text style={styles.sectionHeaderText}>
              Nearby
            </Text>
          </View>
          <Gallery />
        </Animated.ScrollView>
      </Gradient>
    );
  }
}

export default withTimer(LocationScreen);

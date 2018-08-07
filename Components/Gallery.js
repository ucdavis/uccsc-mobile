import React from 'react';
import {
  TouchableOpacity,
  Image,
  View,
  Text,
  LayoutAnimation,
  Linking,
  TouchableWithoutFeedback
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import AppConfig from '../Config/AppConfig';
import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';
import { withTimer } from '../Helpers/WithTimer';

import { Colors, Images } from '../Themes';
import styles from './Styles/GalleryStyle';

const nearby = require('../Fixtures/nearby.json');

class Gallery extends React.PureComponent {

  state = {
    activeTab: Object.keys(nearby)[0],
  }

  openLink = async (url) => {
    const supported = Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  }

  setActiveTab = (tab) => {
    if (!AppConfig.disableAnimations) {
      LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: 250 });
    }
    this.setState({ activeTab: tab });
    this.props.timer.setTimeout(() => accessibilityFocusRef(this._itemsContainer), 100);
  }

  renderTab = (tab) => {
    const { activeTab } = this.state;
    const isActive = activeTab === tab;

    const textStyle = [
      styles.tabText,
      isActive && styles.activeTabText
    ];

    return (
      <TouchableOpacity
        key={tab}
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => this.setActiveTab(tab)}
        accessible
        accessibilityLabel={tab}
        accessibilityTraits='button'
        accessibilityComponentType='button'
      >
        <Text style={textStyle}>
          {tab}
        </Text>
        { tab === 'Food' && <FontAwesome name="cutlery" style={[textStyle, { marginLeft: 5 }]}/> }
        { tab === 'Coffee' && <FontAwesome name="coffee" style={[textStyle, { marginLeft: 5 }]}/> }
        { tab === 'Dessert' && <FontAwesome name="birthday-cake" style={[textStyle, { marginLeft: 5 }]}/> }
      </TouchableOpacity>
    );
  }

  renderItem = (itemData) => {
    const { name, image, link } = itemData;
    return (
      <TouchableWithoutFeedback
        key={name}
        onPress={() => this.openLink(link)}
        accessible
        accessibilityLabel={name}
        accessibilityTraits='button'
        accessibilityComponentType='button'
      >
        <View style={styles.item}>
          <Image source={Images[image]} resizeMode={'cover'} style={styles.itemImage} />
          <View style={styles.itemDetail}>
            <Text style={styles.itemTitle}>{name}</Text>
            <View style={styles.itemActionContainer}>
              <Text style={styles.itemAction}>
                More
              </Text>
              <FontAwesome name="long-arrow-right" size={12} color={Colors.darkPurple} style={styles.rightArrow} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { activeTab } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.tabs}>
          { Object.keys(nearby).map((t) => this.renderTab(t)) }
        </View>
        <View style={styles.gallery} ref={r => this._itemsContainer = r}>
          { nearby[activeTab].map(this.renderItem) }
        </View>
      </View>
    );
  }
}

export default withTimer(Gallery);

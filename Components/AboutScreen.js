import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  LayoutAnimation,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Gradient from '../Components/Gradient';
import SeeProcess from '../Components/SeeProcess';
import Twitter from '../Components/Twitter';
import Sponsors from '../Components/Sponsors';
import LiveHelp from '../Components/LiveHelp';
import ConferenceAnnouncements from '../Containers/ConferenceAnnouncements';

import styles from './Styles/AboutScreenStyle';

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Info',
    tabBarAccessibilityLabel: 'Conference Information Tab. Button.',
    tabBarIcon: ({ focused }) => (
      <MaterialIcons name="info" size={24} color="white" />
    ),
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'liveHelp',
    };
  }

  setActiveTab = (tab) => {
    LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.linear, duration: 250 });
    this.setState({ activeTab: tab });
  }

  renderTabs() {
    const { activeTab } = this.state;
    const liveHelpStyles = [
      styles.tab,
      activeTab === 'liveHelp' && styles.activeTab,
    ];
    const sponsorStyles = [
      styles.tab,
      activeTab === 'sponsors' && styles.activeTab,
    ];
    const liveHelpTextStyles = [
      styles.tabText,
      activeTab === 'liveHelp' && styles.activeTabText,
    ];
    const sponsorTextStyles = [
      styles.tabText,
      activeTab === 'sponsors' && styles.activeTabText,
    ];

    return (
      <View style={styles.tabsContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={liveHelpStyles}
            onPress={() => this.setActiveTab('liveHelp')}
            accessibilityLabel='Slack information tab.'
            accessibilityTraits='button'
          >
            <Text style={liveHelpTextStyles}>
              Slack
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sponsorStyles}
            onPress={() => this.setActiveTab('sponsors')}
            accessibilityLabel='UCCSC sponsors tab.'
            accessibilityTraits='button'
          >
            <Text style={sponsorTextStyles}>
              UCCSC Sponsors
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderTabsContent()}
      </View>
    );
  }

  renderTabsContent() {
    const { activeTab } = this.state;
    return activeTab === 'liveHelp' ? <LiveHelp /> : <Sponsors />;
  }

  render() {
    return (
      <Gradient style={styles.container}>
        <ScrollView>
          <ConferenceAnnouncements />
          <Twitter />
          {this.renderTabs()}
          <SeeProcess />
        </ScrollView>
      </Gradient>
    );
  }
}

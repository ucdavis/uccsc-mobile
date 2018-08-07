import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  LayoutAnimation,
} from 'react-native';

import { accessibilityFocusRef } from '../Helpers/AccessibilityHelpers';
import { withTimer } from '../Helpers/WithTimer';
import { addActionListener } from '../Services/NavigationService';

import Gradient from '../Components/Gradient';
import SeeProcess from '../Components/SeeProcess';
import Twitter from '../Components/Twitter';
import Sponsors from '../Components/Sponsors';
import LiveHelp from '../Components/LiveHelp';
import ConferenceAnnouncements from '../Containers/ConferenceAnnouncements';

import styles from './Styles/AboutScreenStyle';

class AboutScreen extends React.PureComponent {

  state = {
    activeTab: 'liveHelp',
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
    if (payload.key === 'About') {
      this.accessibilityFocusTop();
    }
  }

  accessibilityFocusTop = () => {
    this.props.timer.setTimeout(() => accessibilityFocusRef(this._annoucementsRef), 100);
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
        <ScrollView ref={r => this._annoucementsRef = r}>
          <ConferenceAnnouncements />
          <Twitter />
          {this.renderTabs()}
          <SeeProcess />
        </ScrollView>
      </Gradient>
    );
  }
}

export default withTimer(AboutScreen);

import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Images, Metrics } from '../Themes';
import Announcement from '../Components/Announcement';

import styles from './Styles/ConferenceAnnouncementsStyles';

class ConferenceAnnouncements extends React.Component {

  render() {
    const { news } = this.props;
    if (!news || !news.length) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Announcement announcement={news[0]} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.announcements.news,
  };
};

export default connect(mapStateToProps)(ConferenceAnnouncements);


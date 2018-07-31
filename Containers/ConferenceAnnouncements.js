import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Announcement from '../Components/Announcement';

import { Metrics } from '../Themes/';
import styles from './Styles/ConferenceAnnouncementsStyles';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const itemWidth = viewportWidth - Metrics.doubleBaseMargin;


class ConferenceAnnouncements extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    };
  }

  renderAnnoucement({item}) {
    return (
        <Announcement announcement={item} />
    );
  }

  render() {
    const { news } = this.props;
    const { activeSlide } = this.state;

    if (!news || !news.length) {
      return null;
    }

    const first = news[0];
    const last = news[news.length-1];

    const data = [
      first, last,
    ];

    return (
      <View style={styles.container}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={data}
          itemWidth={itemWidth}
          renderItem={this.renderAnnoucement}
          containerCustomStyle={styles.carousel}
          slideStyle={styles.slide}
          sliderWidth={viewportWidth}
          onSnapToItem={(index) => this.setState({ activeSlide: index })}
        />
        <Pagination
          tappableDots={!!this._carousel}
          carouselRef={this._carousel}
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagination}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
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


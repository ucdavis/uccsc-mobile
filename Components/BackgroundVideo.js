import React from 'react';
import { View } from 'react-native';
import { Video } from 'expo';

const BackgroundVideo = ({ source, isActive, style }) => {
  if (isActive && source) {
    return (
      <Video
        source={source}
        rate={1.0}
        paused={!isActive}
        resizeMode="cover"
        shouldPlay
        isMuted
        isLooping
        style={style}
      />
    );
  }

  return (<View />);
};

export default BackgroundVideo;

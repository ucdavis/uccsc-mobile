import React from 'react';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

export default class Logo extends React.Component {

  componentDidMount() {
    this._playAnimation();
  }

  _playAnimation = () => {
    this.animation.play();
  };

  render() {
    return (
      <Lottie
        ref={a => { this.animation = a; }}
        source={require('./Logo/data.json')}
        {...this.props}
      />
    );
  }
}

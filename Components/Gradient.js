import React from 'react';
import { LinearGradient } from 'expo';
import { Colors } from '../Themes';

const Gradient = (props) => {
  const gradient = [Colors.blue, Colors.darkBlue1];

  return (
    <LinearGradient colors={gradient} style={props.style}>
      {props.children}
    </LinearGradient>
  );
};

export default Gradient;

import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes/';
import ModalStyle from './ModalStyle';

const Styles = StyleSheet.create({
  ...ModalStyle,
  statusBar: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 35,
  },
  statusBarText: {
  },
});

export default Styles;

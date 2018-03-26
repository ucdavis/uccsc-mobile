import { TextStyle, ViewStyle, ImageStyle } from 'react-native';
import { ApplicationStyles, Colors, Fonts } from '../../Themes/';

const ModalStyle = {
  ...ApplicationStyles.screen,
  wrapper: {
    flex: 1,
    backgroundColor: Colors.ricePaper,
  },
  container: {
    flex: 1,
    margin: 40,
    backgroundColor: Colors.darkBlue1,
    justifyContent: 'space-around',
  },
  heading: {
    marginTop: 14,
    fontFamily: Fonts.type.semiBold,
    fontSize: 31,
    letterSpacing: 0.2,
    backgroundColor: Colors.transparent,
    color: Colors.snow,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontFamily: Fonts.style.medium,
    fontSize: 15,
    color: '#FDE5FF',
    letterSpacing: 0.47,
    lineHeight: 23,
    paddingVertical: 10,
  },
  closeButton: {
    position: 'absolute',
    paddingTop: 30,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginHorizontal: 15,
    backgroundColor: Colors.clear,
    height: 40,
  },
  closeIcon: {
    color: Colors.silver,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 7,
  },
  text: {
    fontFamily: Fonts.style.base,
    fontSize: 17,
    color: Colors.silver,
    backgroundColor: Colors.clear,
  },
};

export default ModalStyle;

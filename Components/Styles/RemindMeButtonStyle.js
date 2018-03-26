import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../Themes/';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: Colors.red,
    borderRadius: 100,
    backgroundColor: Colors.clear,
    height: 34,
  },
  activeButton: {
    backgroundColor: Colors.red,
  },
  star: {
    marginRight: 7,
    fontSize: 11,
    color: Colors.red,
  },
  text: {
    fontFamily: Fonts.type.medium,
    fontSize: 11,
    color: Colors.red,
  },
  activeText: {
    color: Colors.snow,
  },
});

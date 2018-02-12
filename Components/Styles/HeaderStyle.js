import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        // height: 150,
        
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // overflow: 'hidden',
    },
    bar: {
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        // justifyContent: 'center',
        // overflow: 'hidden',
    },
    text: {
        fontFamily: 'Montserrat-Light',
        fontSize: 16,
        textAlign: 'left',
        color: 'white',
        backgroundColor: 'transparent'
    }
});
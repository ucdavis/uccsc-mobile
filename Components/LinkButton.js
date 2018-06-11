import React from 'react';
import { Text, Linking, Button } from 'react-native';
 
 const LinkButton = (props) => {
  if (props.buttonUri && props.buttonText) {
    const { buttonUri, buttonText } = props;
    return (
      <Button
        onPress={() => Linking.openURL(buttonUri)}
        style={styles.partyButton}
      >
        <Text style={styles.partyButtonText}>
          {buttonText.toUpperCase()}
        </Text>
      </Button>

    );
  }

  return null;
};

export default LinkButton;
import {
  AccessibilityInfo,
  findNodeHandle,
  Platform,
  UIManager,
} from 'react-native';
import Sentry from 'sentry-expo';

export function accessibilityFocusRef(ref) {
  try {
    const nodeHandle = findNodeHandle(ref);
    if (Platform.OS === 'ios') {
      AccessibilityInfo.setAccessibilityFocus(nodeHandle);
    } else {
      UIManager.sendAccessibilityEvent(nodeHandle, 8);
    }
  }
  catch (err) {
    Sentry.captureException(err);
  }
}
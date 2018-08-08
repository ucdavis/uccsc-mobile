import {
  AccessibilityInfo,
  findNodeHandle,
  Platform,
  UIManager,
} from 'react-native';

export function accessibilityFocusRef(ref) {
  const nodeHandle = findNodeHandle(ref);
  if (Platform.OS === 'ios') {
    AccessibilityInfo.setAccessibilityFocus(nodeHandle);
  } else {
    UIManager.sendAccessibilityEvent(nodeHandle, 8);
  }
}
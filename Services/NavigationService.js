import { NavigationActions } from 'react-navigation';

let _navigator;

export function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

export function navigate(target) {
  _navigator.dispatch(
    NavigationActions.navigate(target)
  );
}

export function emitAction(state) {
  actionSubscribers.forEach(s => s(state));
}

const actionSubscribers = new Set();

export function addActionListener(handler) {
  actionSubscribers.add(handler);
  return {
    remove: () => {
      actionSubscribers.delete(handler);
    }
  };
}

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

import { Permissions, Notifications } from 'expo';
import Config from '../Config/ServerConfig';
import PNHelpers from '../Helpers/PushNotificationHelpers';

export async function checkNotificationPermission() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  return finalStatus;
}

export async function registerForPushNotificationsAsync() {

  // Stop here if the user did not grant permissions
  const permission = await checkNotificationPermission();
  if (permission !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token;
  try {
    token = await Notifications.getExpoPushTokenAsync();
  } catch (err){
    console.error(err);
  }

  if (!token) {
    return;
  }
  
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  await fetch(Config.notificationsEndpoint, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });
}

export async function scheduleTalkReminder(talk) {
  // Stop here if the user did not grant permissions
  const permission = await checkNotificationPermission();
  if (permission !== 'granted') {
    return 0;
  }

  const { title, start } = talk;
  const message = PNHelpers.pushMessage(title, start);
  const id = await Notifications.scheduleLocalNotificationAsync({
    title: message,
    body: message,
    data: {
      message,
      link: `//session/${title}`,
    },
  }, {
    time: PNHelpers.notificationTime(start),
  });

  return id;
}

export async function cancelTalkReminder(id) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export default {
  registerForPushNotificationsAsync,
  scheduleTalkReminder,
  cancelTalkReminder,
};

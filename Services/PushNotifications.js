import { Platform } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { isPast } from 'date-fns';

import Config from '../Config/ServerConfig';
import PNHelpers from '../Helpers/PushNotificationHelpers';

const presetNotifications = require('../Fixtures/notifications.json');

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
  const response = await fetch(Config.notificationsEndpoint, {
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

export function setupNotificationChannels() {
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'Notifications',
      sound: false,
    });
  }
}

export async function scheduleTalkReminder(talk) {
  // build notification object and ship it
  const { title, start } = talk;
  const notification = { 
    message: PNHelpers.pushMessage(title, start),
    link: `//session/${title}`,
    time: start,
  };

  const id = await scheduleNotification(notification);
  return id;
}

export async function schedulePresetNotifications() {
  for (var i = 0; i < presetNotifications.length; i++) {
    const notification = presetNotifications[i];
    if (!notification.enabled) {
      return;
    }

    await scheduleNotification({
      message: notification.title,
      link: notification.data.link,
      time: notification.time,
    });
  }
}

export async function scheduleNotification(notification) {

  // Stop here if the user did not grant permissions
  const permission = await checkNotificationPermission();
  if (permission !== 'granted') {
    return 0;
  }

  const time = PNHelpers.notificationTime(notification.time);
  if (isPast(time)) {
    return 0;
  }

  const id = await Notifications.scheduleLocalNotificationAsync({
    title: notification.message,
    body: notification.message,
    data: {
      message: notification.message,
      link: notification.link,
    },
    android: {
      channelId: 'default',
    },
  }, {
    time: time,
  });

  return id;
}

export async function cancelNotification(id) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export default {
  registerForPushNotificationsAsync,
  setupNotificationChannels,
  schedulePresetNotifications,
  scheduleTalkReminder,
  cancelNotification,
  cancelAllNotifications,
};

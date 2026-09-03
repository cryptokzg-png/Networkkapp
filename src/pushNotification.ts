let notifee: any = null;

try {
  notifee = require('@notifee/react-native').default;
} catch {}

export const hasPushSupport = !!notifee;

export async function sendPushNotification(title: string, body: string): Promise<boolean> {
  if (!notifee) return false;
  try {
    const channelId = await notifee.createChannel({
      id: 'reminders',
      name: 'Hatırlatmalar',
      importance: 4,
    });
    await notifee.displayNotification({
      title,
      body,
      android: {channelId, pressAction: {id: 'default'}},
    });
    return true;
  } catch {
    return false;
  }
}

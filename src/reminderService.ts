import {AppState, type AppStateStatus} from 'react-native';
import {Contact, loadContacts, saveContacts, loadTelegramSettings} from './storage';

let intervalId: ReturnType<typeof setInterval> | null = null;
let appStateSubscription: {remove: () => void} | null = null;

async function sendTelegramReminder(contact: Contact, token: string, chatId: string, topicId: string): Promise<boolean> {
  try {
    const body: any = {
      chat_id: chatId,
      text: `🔔 Hatırlatma: ${contact.name}${contact.company ? ` (${contact.company})` : ''}\n📅 Takip: ${contact.followUpDate}\n${contact.note ? `📝 ${contact.note}` : ''}`,
      parse_mode: 'HTML',
    };
    if (topicId) body.message_thread_id = topicId;
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    const d = await r.json();
    return r.ok && d.ok;
  } catch {
    return false;
  }
}

export async function checkAndSendReminders(): Promise<number> {
  const telegram = await loadTelegramSettings();
  if (!telegram.connected || !telegram.token || !telegram.chatId) return 0;

  const contacts = await loadContacts();
  const now = Date.now();
  let sentCount = 0;
  let changed = false;

  for (const contact of contacts) {
    if (!contact.followUpDate) continue;
    if (contact.reminderChannel === 'none') continue;
    if (contact.reminderSentAt) continue;

    const followUpTime = new Date(contact.followUpDate).getTime();
    if (isNaN(followUpTime)) continue;

    const reminderMinutes = contact.reminderMinutes ?? 60;
    const reminderTime = followUpTime - reminderMinutes * 60 * 1000;

    if (now >= reminderTime) {
      const sent = await sendTelegramReminder(contact, telegram.token, telegram.chatId, telegram.topicId);
      if (sent) {
        contact.reminderSentAt = new Date().toISOString();
        changed = true;
        sentCount++;
      }
    }
  }

  if (changed) await saveContacts(contacts);
  return sentCount;
}

export function startReminderChecker() {
  if (intervalId) return;

  checkAndSendReminders();

  intervalId = setInterval(() => {
    checkAndSendReminders();
  }, 60_000);

  appStateSubscription = AppState.addEventListener('change', (state: AppStateStatus) => {
    if (state === 'active') {
      checkAndSendReminders();
    }
  });
}

export function stopReminderChecker() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (appStateSubscription) {
    appStateSubscription.remove();
    appStateSubscription = null;
  }
}

import { google } from 'googleapis';

export interface CalendarEvent {
  summary?: string | null;
  start: { date?: string | null };
  end: { date?: string | null };
}

export async function getEvents(): Promise<CalendarEvent[]> {
  const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? '{}');

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  });

  const calendar = google.calendar({ version: 'v3', auth });

  const timeMin = new Date();
  timeMin.setDate(timeMin.getDate() - 3);

  const response = await calendar.events.list({
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    timeMin: timeMin.toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  });

  return (response.data.items ?? []) as CalendarEvent[];
}

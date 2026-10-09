// date helper

// getTodayString 
export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// format date to regualr date style
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

// get the Day number for the post like day 1 , day 2 etc
export function getDayDate(startDate: string, dayNumber: number): string {
  const date = new Date(startDate);
  date.setUTCDate(date.getUTCDate() + dayNumber - 1);
  return date.toISOString();
}

  // get time
  export function formatTime(time: string): string {
    if (!time) return '';

    const [hourText, minute] = time.split(':');
    const hour = Number(hourText);

    const period = hour >= 12 ? 'PM' : 'AM';

    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minute} ${period}`;
  }
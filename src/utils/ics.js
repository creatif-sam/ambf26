// src/utils/ics.js

/**
 * Generates and triggers a download of an .ics calendar file
 * @param {string} title - Event name
 * @param {string} description - Event details
 * @param {string} location - Event location
 * @param {Date} start - Start datetime (JavaScript Date)
 * @param {Date} end - End datetime (JavaScript Date)
 * @param {string} fileName - Optional filename for the downloaded .ics
 */
export function downloadICS(title, description, location, start, end, fileName = "event.ics") {
  const dtStamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");
  const dtStart = start.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");
  const dtEnd = end.toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AfricaMed 2026//AfricaMed Business Forum//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${dtStamp}@africamedforum.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

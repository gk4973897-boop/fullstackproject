export function isPaymentAllowed() {
  const now = new Date();

  // Convert to IST
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);

  const hours = istTime.getUTCHours();
  const minutes = istTime.getUTCMinutes();

  const currentMinutes = hours * 60 + minutes;

  const start = 10 * 60; // 10:00 AM
  const end = 11 * 60;   // 11:00 AM

  return currentMinutes >= start && currentMinutes <= end;
}
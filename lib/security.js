export function isSuspiciousLogin(oldLogs, newIP, newDevice) {
  if (!oldLogs || oldLogs.length === 0) return false;

  const lastLogin = oldLogs[0];

  if (lastLogin.ip !== newIP) return true;
  if (lastLogin.deviceType !== newDevice) return true;

  return false;
}
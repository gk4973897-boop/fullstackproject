import * as UAParser from "ua-parser-js";

export function getDeviceInfo(userAgent) {
  const parser = new UAParser.UAParser(userAgent);
  const result = parser.getResult();

  let deviceType = "desktop";

  if (result.device?.type === "mobile") {
    deviceType = "mobile";
  } else if (result.device?.type === "tablet") {
    deviceType = "tablet";
  }

  return {
    browser: result.browser?.name || "Unknown",
    os: result.os?.name || "Unknown",
    deviceType,
  };
}
export function normalizeUrl(inputUrl: string) {
  const trimmed = inputUrl.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return new URL(trimmed).toString();
  }

  return new URL(`https://${trimmed}`).toString();
}

export function getHostname(inputUrl: string) {
  return new URL(inputUrl).hostname.toLowerCase();
}

export function isInternalUrl(candidate: string, hostname: string) {
  try {
    const resolved = new URL(candidate);
    return resolved.hostname.toLowerCase() === hostname;
  } catch {
    return false;
  }
}

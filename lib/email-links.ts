/**
 * Creates a standard RFC 6068 mailto URL prefilled with recipient, subject, and body.
 * Formats spaces as %20 for universal compatibility across desktop and mobile mail clients.
 */
export function getMailtoUrl(to: string, subject?: string, body?: string): string {
  const parts: string[] = []
  if (subject) {
    parts.push(`subject=${encodeURIComponent(subject)}`)
  }
  if (body) {
    parts.push(`body=${encodeURIComponent(body)}`)
  }
  return parts.length > 0 ? `mailto:${to}?${parts.join('&')}` : `mailto:${to}`
}

/**
 * Alias for backward-compatibility ensuring any remaining callers produce
 * clean mailto URLs that open a compose window rather than dumping to an inbox.
 */
export function getGmailComposeUrl(to: string, subject?: string, body?: string): string {
  return getMailtoUrl(to, subject, body)
}

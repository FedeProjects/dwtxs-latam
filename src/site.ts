// Company contact data shown on the site. Values are pending from the client (PROJECT_SPEC §10).

/** WhatsApp business number in international format, digits only (e.g. 55…). [TBD] */
export const whatsappNumber = '';

/** `wa.me` link with a prefilled message. Without a number, WhatsApp asks who to send it to. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

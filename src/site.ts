// Company contact data shown on the site. Values are pending from the client (PROJECT_SPEC §10).

/** WhatsApp business number in international format, digits only (e.g. 55…). [TBD] */
export const whatsappNumber = '';

/** DW Máquinas company data for the About page. Empty values show as "to be confirmed". [TBD] */
export const company = {
  legalName: '',
  taxId: '',
  address: '',
  phone: '',
  email: '',
};

/** `wa.me` link with a prefilled message. Without a number, WhatsApp asks who to send it to. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

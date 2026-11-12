// One validation flow for every website form (careers, business lead
// dialogs, contact…): the form uses `noValidate`, these rules run on submit,
// each invalid field shows its own message right under it, and the first one
// is scrolled into view and focused.

const MESSAGES = {
  en: {
    required: (label) => `${label} is required.`,
    email: "Enter a valid email address (e.g. name@example.com).",
    phone: "Enter a valid UAE mobile number: 9 digits starting with 50, 52, 54, 55, 56 or 58 (e.g. 50 123 4567).",
    url: "Enter a full link starting with https://",
  },
  ar: {
    required: (label) => `حقل ${label} مطلوب.`,
    email: "أدخل بريدًا إلكترونيًا صحيحًا (مثال: name@example.com).",
    phone: "أدخل رقم جوال إماراتي صحيحًا: 9 أرقام تبدأ بـ 50 أو 52 أو 54 أو 55 أو 56 أو 58 (مثال: ‎50 123 4567).",
    url: "أدخل رابطًا كاملًا يبدأ بـ https://",
  },
};

export function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v ?? "").trim());
}

// Mobile numbers (every website form): UAE only. The field shows a fixed
// +971 and the visitor types the remaining 9 digits, which must start with a
// UAE mobile prefix (50, 52, 54, 55, 56, 58). Same rule as the backend's
// src/validation/phone.js.
export const UAE_MOBILE_PREFIXES = ["50", "52", "54", "55", "56", "58"];
const UAE_MOBILE_RE = /^5[024568]\d{7}$/;

// Any typed / pasted form → the 9 local digits: drops spaces and symbols, a
// leading +971 / 00971 / 971, and the local trunk 0 (050… → 50…).
export function normalizeUaeMobile(v) {
  let d = String(v ?? "").replace(/\D/g, "");
  if (d.startsWith("00971")) d = d.slice(5);
  else if (d.startsWith("971") && d.length > 9) d = d.slice(3);
  d = d.replace(/^0+/, "");
  return d.slice(0, 9);
}

export function isValidUaeMobile(v) {
  const d = normalizeUaeMobile(v);
  // Reject the right prefix followed by one digit repeated (50 000 0000…).
  return UAE_MOBILE_RE.test(d) && !/^5\d(\d)\1{6}$/.test(d);
}

// Value sent to the server: "+971 50 123 4567".
export function formatUaeMobile(v) {
  const d = normalizeUaeMobile(v);
  return d ? `+971 ${d.slice(0, 2)} ${d.slice(2, 5)} ${d.slice(5)}`.trim() : "";
}

// Kept for older callers: a phone field is now always a UAE mobile.
export const isValidPhone = isValidUaeMobile;

export function isValidUrl(v) {
  return /^https?:\/\/[^\s]+\.[^\s]+/i.test(String(v ?? "").trim());
}

// Use in onChange: keeps the 9 local digits only.
export const sanitizePhone = normalizeUaeMobile;

/**
 * rules: { fieldName: { label, required?, email?, phone?, url? } }
 * Optional fields are only checked when filled in.
 * Returns { fieldName: message } — empty object when everything is valid.
 */
export function validateForm(values, rules, language = "en") {
  const m = MESSAGES[language] || MESSAGES.en;
  const errors = {};
  for (const [name, rule] of Object.entries(rules)) {
    const value = String(values?.[name] ?? "").trim();
    if (!value) {
      if (rule.required) errors[name] = m.required(rule.label || name);
      continue;
    }
    if (rule.email && !isValidEmail(value)) errors[name] = m.email;
    else if (rule.phone && !isValidPhone(value)) errors[name] = m.phone;
    else if (rule.url && !isValidUrl(value)) errors[name] = m.url;
  }
  return errors;
}

/**
 * Scroll the first invalid field (in rules order) into the middle of the
 * screen and focus it. Works inside popups and in the page's smooth-scroll
 * container. `formEl` is the <form> element; fields are found by `name`.
 */
export function focusFirstError(formEl, errors, order) {
  const names = (order || Object.keys(errors)).filter((n) => errors[n]);
  if (!formEl || names.length === 0) return;
  const field = formEl.querySelector(`[name="${CSS.escape(names[0])}"]`);
  if (!field) return;
  field.scrollIntoView({ behavior: "smooth", block: "center" });
  field.focus({ preventScroll: true });
}

// Classes for an input in its error state (append to the normal classes).
export const errorInputClass = "border-red-400 focus:border-red-500 focus:ring-red-100";

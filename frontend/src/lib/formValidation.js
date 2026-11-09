// One validation flow for every website form (careers, business lead
// dialogs, contact…): the form uses `noValidate`, these rules run on submit,
// each invalid field shows its own message right under it, and the first one
// is scrolled into view and focused.

const MESSAGES = {
  en: {
    required: (label) => `${label} is required.`,
    email: "Enter a valid email address (e.g. name@example.com).",
    phone: "Enter a valid mobile number: 7–15 digits, optionally starting with + (e.g. +971 50 123 4567).",
    url: "Enter a full link starting with https://",
  },
  ar: {
    required: (label) => `حقل ${label} مطلوب.`,
    email: "أدخل بريدًا إلكترونيًا صحيحًا (مثال: name@example.com).",
    phone: "أدخل رقم جوال صحيحًا: من 7 إلى 15 رقمًا، ويمكن أن يبدأ بـ + (مثال: ‎+971 50 123 4567).",
    url: "أدخل رابطًا كاملًا يبدأ بـ https://",
  },
};

export function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v ?? "").trim());
}

// Mobile / phone: digits with optional spaces, dashes, dots or brackets and an
// optional leading +; 7–15 digits in total (E.164 max is 15).
export function isValidPhone(v) {
  const raw = String(v ?? "").trim();
  if (!/^\+?[\d\s\-().]+$/.test(raw)) return false;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function isValidUrl(v) {
  return /^https?:\/\/[^\s]+\.[^\s]+/i.test(String(v ?? "").trim());
}

// Keep only characters a phone number can contain (use in onChange).
export function sanitizePhone(v) {
  return String(v ?? "").replace(/[^\d+\s\-().]/g, "").replace(/(?!^)\+/g, "");
}

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

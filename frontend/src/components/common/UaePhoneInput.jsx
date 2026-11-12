"use client";

import { normalizeUaeMobile } from "@/lib/formValidation";

// The one mobile-number field for every website form: a fixed "+971" box and
// the 9 remaining digits (e.g. 50 123 4567). The form keeps only those 9
// digits; send formatUaeMobile(value) to the server. Rules live in
// src/lib/formValidation.js (isValidUaeMobile).
//
// size matches the surrounding form's inputs:
//   sm → careers / quote dialogs, md → business / partner dialogs, lg → contact page
const BOX = {
  sm: "rounded-lg bg-slate-50 focus-within:bg-white focus-within:ring-2 sm:rounded-xl",
  md: "rounded-xl bg-slate-50 focus-within:bg-white focus-within:ring-2",
  lg: "rounded-2xl bg-white focus-within:ring-4",
};
const PREFIX = {
  sm: "px-2.5 text-sm sm:px-3",
  md: "px-3 text-sm",
  lg: "px-4 text-base",
};
const INPUT = {
  sm: "px-3 py-2 text-sm sm:px-3.5 sm:py-2.5",
  md: "px-3.5 py-2.5 text-sm",
  lg: "px-4 py-3.5 text-base",
};

export default function UaePhoneInput({
  name = "phone",
  id,
  value,
  onChange,
  invalid = false,
  size = "md",
  placeholder = "50 123 4567",
  required = false,
}) {
  return (
    // Phone numbers always read left-to-right, even on the Arabic site.
    <div
      dir="ltr"
      className={`flex items-stretch overflow-hidden border transition focus-within:border-[#0088FF] focus-within:ring-[rgba(0,136,255,0.12)] ${BOX[size]} ${
        invalid ? "border-red-400" : "border-slate-200"
      }`}
    >
      <span
        className={`flex shrink-0 items-center border-r border-slate-200 bg-slate-100 font-semibold text-slate-600 ${PREFIX[size]}`}
        aria-hidden="true"
      >
        +971
      </span>
      <input
        id={id}
        type="tel"
        name={name}
        inputMode="numeric"
        autoComplete="tel-national"
        required={required}
        aria-invalid={invalid}
        value={value}
        onChange={(e) => onChange(normalizeUaeMobile(e.target.value))}
        placeholder={placeholder}
        className={`w-full min-w-0 bg-transparent text-left text-slate-900 outline-none placeholder:text-slate-400 ${INPUT[size]}`}
      />
    </div>
  );
}

import {
  Building2,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

export const contactDetails = [
  {
    title: "Office Address",
    titleAr: "عنوان المكتب",
    value: "To be confirmed by client",
    valueAr: "سيتم التأكيد من قبل العميل",
    description:
      "Our office location will be published here as soon as the final address is shared.",
    descriptionAr:
      "سيتم نشر موقع مكتبنا هنا فور مشاركة العنوان النهائي.",
    icon: Building2,
  },
  {
    title: "Phone",
    titleAr: "الهاتف",
    value: "+971 4 3782022",
    href: "tel:+97143782022",
    icon: Phone,
  },
  {
    title: "Email",
    titleAr: "البريد الإلكتروني",
    value: "info@halapark.com",
    href: "mailto:info@halapark.com",
    icon: Mail,
  },
  {
    title: "Support Email",
    titleAr: "بريد الدعم",
    value: "support@halapark.com",
    href: "mailto:support@halapark.com",
    icon: Mail,
  },
  {
    title: "WhatsApp",
    titleAr: "واتساب",
    value: "Link/number to be confirmed",
    valueAr: "سيتم تأكيد الرابط/الرقم",
    description:
      "We will add the direct WhatsApp number once it is confirmed by the client.",
    descriptionAr:
      "سنضيف رقم واتساب المباشر بمجرد تأكيده من قبل العميل.",
    icon: MessageCircle,
  },
  {
    title: "Business Hours",
    titleAr: "ساعات العمل",
    value: "To be confirmed by client",
    valueAr: "سيتم التأكيد من قبل العميل",
    icon: Clock3,
  },
];

export const contactSubjects = [
  "General Enquiry",
  "Business / Enterprise",
  "Technical Support",
  "Partnership",
];

export const contactSubjectsAr = [
  "استفسار عام",
  "الأعمال / الشركات",
  "الدعم الفني",
  "الشراكة",
];

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
    value: "To be confirmed by client",
    description:
      "Our office location will be published here as soon as the final address is shared.",
    icon: Building2,
  },
  {
    title: "Phone",
    value: "+971 4 3782022",
    href: "tel:+97143782022",
    icon: Phone,
  },
  {
    title: "Email",
    value: "info@halapark.com",
    href: "mailto:info@halapark.com",
    icon: Mail,
  },
  {
    title: "Support Email",
    value: "support@halapark.com",
    href: "mailto:support@halapark.com",
    icon: Mail,
  },
  {
    title: "WhatsApp",
    value: "Link/number to be confirmed",
    description:
      "We will add the direct WhatsApp number once it is confirmed by the client.",
    icon: MessageCircle,
  },
  {
    title: "Business Hours",
    value: "To be confirmed by client",
    icon: Clock3,
  },
];

export const contactSubjects = [
  "General Enquiry",
  "Business / Enterprise",
  "Technical Support",
  "Partnership",
];

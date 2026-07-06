import {
  Building2,
  Clock3,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

// Maps CMS `details.items[].key` → lucide icon for ContactInfoPanel.
// All contact CONTENT lives in the CMS (`contact` page) — no hardcoded copy.
export const ICON_BY_KEY = {
  address: Building2,
  phone: Phone,
  email: Mail,
  supportEmail: Mail,
  whatsapp: MessageCircle,
  hours: Clock3,
};

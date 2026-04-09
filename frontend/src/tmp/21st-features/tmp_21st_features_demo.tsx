import { Features } from "@/components/ui/features";

import { Brain, BrainCog } from "lucide-react";

const features= [
  {
    id: 1,
    icon: BrainCog,
    title: "Who Are AI Experts?",
    description:
      "AI Experts at BCA Labs are domain-specific mentors trained to guide you in tech, coding, and academics.",
    image: "https://bcalabs.org/companions.jpg",
  },
  {
    id: 2,
    icon: BrainCog,
    title: "Why AI Experts?",
    description:
      "Get instant, accurate help from expertsâ??whether it's for coding or understanding tough concepts. They are trained on their expertise.",
    image: "https://bcalabs.org/companions_group_1.jpg",
  },
  {
    id: 3,
    icon: Brain,
    title: "AI-Powered Learning",
    description:
      "Experience personalized, AI-driven learning tailored for BCA, BBA, and other students.",
    image: "https://bcalabs.org/companions_group_2.jpg",
  },
];

const DemoOne = () => {
  return (
  <Features 
  primaryColor="sky-500"
  progressGradientLight="bg-gradient-to-r from-sky-400 to-sky-500"
  progressGradientDark="bg-gradient-to-r from-sky-300 to-sky-400" 
  features={features} />
  )
  

};

export { DemoOne };


import {
  AudioWaveform,
  Bot,
  Frame,
  GalleryVerticalEnd,
  PieChart,
  SquareTerminal,
} from "lucide-react";

export const linkNav = {
  teams: [
    {
      name: "Test Engineering",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
      navMain: [
        {
          title: "Playground",
          url: "#",
          icon: SquareTerminal,
          isActive: true,
          items: [
            {
              title: "History",
              url: "#",
            },
            {
              title: "Starred",
              url: "#",
            },
            {
              title: "Settings",
              url: "#",
            },
          ],
        },
      ],
    },
    {
      name: "Product Engineering",
      logo: AudioWaveform,
      plan: "Startup",
      navMain: [
        {
          title: "Models",
          url: "#",
          icon: Bot,
          items: [
            {
              title: "Genesis",
              url: "#",
            },
            {
              title: "Explorer",
              url: "#",
            },
            {
              title: "Quantum",
              url: "#",
            },
          ],
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

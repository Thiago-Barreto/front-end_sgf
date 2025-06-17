import * as React from "react";
import {
  AudioWaveform,
  Bot,
  ChartArea,
  ChartNoAxesCombined,
  Cpu,
  FolderKanban,
  PackageOpen,
  PackageSearch,
  UserRoundCog,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "@/components/team-switcher";
import { getUserLogin } from "@/utils/user";

const data = {
  teams: [
    {
      name: "Test Engineering",
      logo: Cpu,
      plan: "Planejamento e Execução de Testes",
      navMain: [
        {
          title: "Entrada de Materiais",
          icon: PackageOpen,
          isActive: true,
          items: [
            {
              title: "Equipamentos",
              url: "/sgf/grupomulti/shared/equipments",
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
      plan: "Desenvolvimento de Produtos",
      navMain: [
        {
          id: 1,
          title: "Modelos",
          url: "/sgf/grupomulti/private/engineering/product/models",
          icon: FolderKanban,
        },
        {
          id: 2,
          title: "NPI",
          url: "/sgf/grupomulti/private/engineering/product/npi",
          icon: ChartNoAxesCombined,
        },
      ],
    },
    {
      name: "Process Engineering",
      logo: PackageSearch,
      plan: "Startup",
      navMain: [
        {
          title: "Registro",
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
  public: [
    {
      name: "Cronograma de NPI",
      url: "/sgf/npi schedule",
      icon: ChartArea,
    },
    {
      name: "Usuários",
      url: "/sgf/grupomulti/public/users",
      icon: UserRoundCog,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = getUserLogin();
  const { sector } = user;

  const initialTeams =
    sector === "System Developer"
      ? data.teams
      : data.teams.filter((team) => {
          if (sector === "Product Engineering")
            return team.name === "Product Engineering";
          if (sector === "Test Engineering")
            return team.name === "Test Engineering";
          if (sector === "Process Engineering")
            return team.name === "Process Engineering";
          return false;
        });

  const [activeTeams, setActiveTeams] = React.useState(initialTeams);
  const [activeTeam, setActiveTeam] = React.useState(activeTeams[0]);
  const handleTeamChange = (team) => {
    setActiveTeam(team);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher
          teams={activeTeams}
          onTeamChange={handleTeamChange}
          activeTeam={activeTeam}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={activeTeam.navMain} />
        <NavProjects projects={data.public} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import * as React from "react";
import {
  ArrowLeftRight,
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
              url: "/sgf/engineering/equipments",
            },
          ],
        },
        {
          title: "Movimentações",
          icon: ArrowLeftRight,
          isActive: false,
          items: [
            {
              title: "Equipamentos",
              url: "/sgf/engineering/movements/equipments",
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
          url: "/sgf/engineering/models",
          icon: FolderKanban,
        },
        {
          id: 2,
          title: "NPI",
          url: "/sgf/engineering/npi",
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
      name: "Dashboards",
      icon: FolderKanban,
      isActive: true,
      items: [
        {
          title: "Cronograma de NPI",
          id: 1,
          url: "/sgf/npi schedule",
        },
      ],
    },
    {
      name: "Usuários",
      url: "/sgf/users",
      icon: UserRoundCog,
      isActive: false,
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

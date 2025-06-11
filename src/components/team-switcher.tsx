import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoM from "../assets/M.png";
import LogoBlue from "../assets/logoBlue.svg";
import { getUserLogin } from "@/utils/user";

export function TeamSwitcher({
  teams,
  onTeamChange,
  activeTeam,
}: Readonly<{
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
  onTeamChange: (team: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }) => void;
  activeTeam: {
    name: string;
    logo: React.ElementType;
    plan: string;
  };
}>) {
  const { isMobile } = useSidebar();

  if (!activeTeam) {
    return null;
  }
  const handleTeamChange = (team) => {
    onTeamChange(team);
  };

  const user = getUserLogin();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg border">
                <img src={LogoM} className="h-4" alt="" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <img src={LogoBlue} className="h-5" alt="" />
                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {user.sector === "System Developer" && (
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-muted-foreground text-xs">
                Teams
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => handleTeamChange(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <team.logo className="size-3.5 shrink-0" />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

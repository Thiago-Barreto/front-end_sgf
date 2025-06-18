import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import SignIn from "./pages/auth/signIn/page";
import DashboardNpi from "./pages/sgf/(public)/dashboards/npi/page";
import UserMain from "./pages/sgf/(public)/users/page";
import ModelsMain from "./pages/sgf/(private)/engineering/(product)/models/page";
import NpiMain from "./pages/sgf/(private)/engineering/(product)/npi/page";
import EquipmentsMain from "./pages/sgf/(shared)/equipments/page";
import ReturnEquipments from "./pages/sgf/(shared)/moviments/equipments/page";

export function AnimatesRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sgf/npi schedule" element={<DashboardNpi />} />
        <Route path="/sgf/users" element={<UserMain />} />
        <Route path="/sgf/engineering/models" element={<ModelsMain />} />
        <Route path="/sgf/engineering/npi" element={<NpiMain />} />
        <Route
          path="/sgf/engineering/equipments"
          element={<EquipmentsMain />}
        />
        <Route
          path="/sgf/engineering/movements/equipments"
          element={<ReturnEquipments />}
        />
        {/* <Route path="*" element={<DefaultErro />} /> */}
      </Routes>
    </AnimatePresence>
  );
}
export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AnimatesRoutes />
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

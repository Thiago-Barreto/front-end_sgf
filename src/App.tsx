import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import SignIn from "./pages/auth/signIn/page";
import DashboardNpi from "./pages/sgf/(dashboard)/page";
import UserMain from "./pages/sgf/(grupomulti)/public/users/page";
import ModelsMain from "./pages/sgf/(grupomulti)/private/engineering/product/models/page";

export function AnimatesRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sgf/npi schedule" element={<DashboardNpi />} />
        <Route path="/sgf/grupomulti/public/users" element={<UserMain />} />
        <Route
          path="/sgf/grupomulti/private/engineering/models"
          element={<ModelsMain />}
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

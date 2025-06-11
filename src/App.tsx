import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import SignIn from "./pages/auth/signIn/page";
import DashboardNpi from "./pages/sgf/(dashboard)/page";
import UserMain from "./pages/sgf/(grupomulti)/public/users/page";

export function AnimatesRoutes() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sgf/npi schedule" element={<DashboardNpi />} />
        <Route path="/sgf/grupomulti/public/users" element={<UserMain />} />
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

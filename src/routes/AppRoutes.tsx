import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ROUTES } from "./routePaths";

const Home = lazy(() => import("../pages/Home"));
const Contact = lazy(() => import("../pages/Contact"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CONTACT} element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

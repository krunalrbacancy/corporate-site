import { Route, Routes } from "react-router-dom";
import CareersList from "../pages/CareersList";
import CareerDetail from "../pages/CareerDetail";
import ApplyJob from "../pages/ApplyJob";
import NotFound from "../../../pages/NotFound";

const CareersRoutes = () => {
  return (
    <Routes>
      <Route index element={<CareersList />} />
      <Route path=":slug" element={<CareerDetail />} />
      <Route path=":slug/apply" element={<ApplyJob />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default CareersRoutes;
import Meta from "./components/common/Meta";
import MainLayout from "./components/layout/MainLayout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Meta title="Corporate Site" description="About our company" />

      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </>
  );
}

export default App;

import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";
import { useAxiosInterceptors } from "./shared/helpers/client";
import { useGlobalStore } from "./state/GlobalStore";
import { PuffLoader } from "react-spinners";

const App = () => {
  useAxiosInterceptors();
  const { loading } = useGlobalStore();

  return (
    <>
      {loading ? (
        <div className="Loader_Box">
          <PuffLoader loading={true} className="Loader" />
        </div>
      ) : (
        <></>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

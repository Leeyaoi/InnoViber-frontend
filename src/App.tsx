import MainPage from "./pages/MainPage/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

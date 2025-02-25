import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/Login";
import { Layout } from "./Layout/Layout";
import { Buyurtmalar } from "./pages/BuyurtmalarPage/Buyurtmalar";
import { Maxsulotlar } from "./pages/MaxsulotlarPage/Maxsulotlar";
import { Kategoriyalar } from "./pages/KategoriyalarPage/Kategoriylar";
import { Filiallar } from "./pages/FiliallarPage/Filiallar";
import { Mijozlar } from "./pages/MijozlarPage/Mijozlar";
import { Xisobotlar } from "./pages/XisobotlarPage/Xisobot";
import { Xodimlar } from "./pages/XodimlarPage/Xodimlar";
import { Xaritalar } from "./pages/XaritalarPage/Xarita";
import { ErrorBoundarayContainer } from "./pages/Additions/ErorrBoundry/erorrboundy";
import { NotFound } from "./pages/Additions/NotFound/notFound";
function App() {
  return (
    <ErrorBoundarayContainer>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="Buyurtmalar" element={<Buyurtmalar />} />
            <Route path="Maxsulotlar" element={<Maxsulotlar />} />
            <Route path="Kategoriyalar" element={<Kategoriyalar />} />
            <Route path="Filiallar" element={<Filiallar />} />
            <Route path="Mijozlar" element={<Mijozlar />} />
            <Route path="Xisobotlar" element={<Xisobotlar />} />
            <Route path="Xodimlar" element={<Xodimlar />} />
            <Route path="Xaritalar" element={<Xaritalar />} />
          </Route>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundarayContainer>
  );
}

export default App;

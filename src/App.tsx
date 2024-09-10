import "./App.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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
import { Provider } from "react-redux";
import { store } from "./pages/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
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
    </Provider>
  );
}

export default App;

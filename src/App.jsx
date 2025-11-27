import Footer from "./components/Footer";
import Header from "./components/Header";
import Panel from "./components/Panel";
import Home from "./Pages/Home";
import Collections from "./Pages/Collections";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";
import OrderHistory from "./Pages/OrderHistory";
import CheckOut from "./Pages/CheckOut";
import ProductInfo from "./Pages/ProductInfo";
import NotFound from "./Pages/NotFound";
import "./App.css";
// -------
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//------
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
// -------
import "@fontsource/inter";
import "@fontsource/quicksand";

import { GlobalProvider } from "./GlobalProvider";
// ------

const Layout = ({ children }) => {
 
  return (
    <div className="Layout">
      <main className="parent-content">
        <div>
          <Panel />
          <Header />
          <div className="content">{children}</div>
        </div>
        <Footer/>
      </main>
    </div>
  );
};

const App = () => {
  
  return (
    
      <Router>
        <GlobalProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/collections"
            element={
              <Layout>
                <Collections />
              </Layout>
            }
          />

          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />

          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />

          <Route
            path="/order-history"
            element={
              <Layout>
                <OrderHistory />
              </Layout>
            }
          />

          <Route
            path="/check-out"
            element={
              <Layout>
                <CheckOut />
              </Layout>
            }
          />

          <Route
            path="/product-info/:productId"
            element={
              <Layout>
                <ProductInfo />
              </Layout>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </GlobalProvider>
      </Router>
    
  );
};

export default App;

import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AdminPage } from "./pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "products", Component: ProductsPage },
      { path: "products/:slug", Component: ProductDetailPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage },
      // Admin panel — password protected at /admin
      { path: "admin", Component: AdminPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);

import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import CoveragePage from "./pages/CoveragePage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";
import { ContentProvider } from "./contexts/ContentContext";

const AdminEkgPage = lazy(() => import("./pages/AdminEkgPage"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/servicios" component={ServicesPage} />
      <Route path="/nosotros" component={AboutPage} />
      <Route path="/cobertura" component={CoveragePage} />
      <Route path="/contacto" component={ContactPage} />
      <Route
        path="/aviso-de-privacidad"
        component={() => <LegalPage kind="privacy" />}
      />
      <Route path="/terminos" component={() => <LegalPage kind="terms" />} />
      <Route path="/administracion">
        <Suspense
          fallback={
            <div className="grid min-h-screen place-items-center bg-[#f6f4ee] text-sm font-bold text-[#1a446c]">
              Cargando herramienta…
            </div>
          }
        >
          <AdminEkgPage />
        </Suspense>
      </Route>
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <Router />
      </ContentProvider>
    </ErrorBoundary>
  );
}

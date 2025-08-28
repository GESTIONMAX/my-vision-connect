import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import des composants et pages
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import B2B from "./pages/B2B";
import B2BRegister from "./pages/B2BRegister";
import B2BLogin from "./pages/B2BLogin";
import Careers from "./pages/Careers";
import LegalNotice from "./pages/LegalNotice";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import Header from "./components/Header";

// Composants temporaires pour navigation
const ChameloDashboard = () => <div className="p-4">Dashboard en cours d'implémentation</div>;
const B2C = () => <div className="p-4">Page B2C en cours d'implémentation</div>;

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-4 pt-6">
          <Routes>
            {/* Page d'accueil temporaire */}
            <Route path="/" element={
              <div className="mb-4">
                <h2 className="text-xl font-bold">Diagnostic du projet</h2>
                <p>Environnement de développement en cours de configuration...</p>
                <p>Cette page est une version temporaire pendant que nous résolvons les problèmes d'importation.</p>
              </div>
            } />
            {/* Routes restaurées progressivement */}
            <Route path="/dashboard" element={<ChameloDashboard />} />
            <Route path="/b2c" element={<B2C />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/produit/:slug" element={<ProductDetail />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/b2b" element={<B2B />} />
            <Route path="/b2b/register" element={<B2BRegister />} />
            <Route path="/b2b/login" element={<B2BLogin />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuthNew";
import { CartProvider } from "@/contexts/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AccountLayout } from "@/components/account/AccountLayout";
import { Dashboard } from "@/components/account/Dashboard";
import { Profile } from "@/components/account/Profile";
import { OrdersPage } from "@/pages/account/OrdersPage";
import { CartPage } from "@/pages/account/CartPage";
import { FavoritesPage } from "@/pages/account/FavoritesPage";
import { SettingsPage } from "@/pages/account/SettingsPage";
import B2C from "./pages/B2C";
import B2B from "./pages/B2B";
import B2BCatalog from "./pages/B2BCatalog";
import B2BPartnership from "./pages/B2BPartnership";
import B2BSupport from "./pages/B2BSupport";
import Shop from "./pages/Shop";
import Index from "./pages/Index";
import NotreSelection from "./pages/NotreSelection";
import ProductDetail from "./pages/ProductDetail";
import Technology from "./pages/Technology";
import FAQ from "./pages/FAQ";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import { Checkout } from "./pages/Checkout";
import CollectionDetail from "./pages/CollectionDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import AdminSync from "./pages/AdminSync";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="mytechgear-theme">
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/products" element={<Navigate to="/shop" replace />} />
                    <Route path="/b2c" element={<B2C />} />
                    <Route path="/b2b" element={<B2B />} />
                    <Route path="/b2b/catalog" element={<B2BCatalog />} />
                    <Route path="/b2b/partnership" element={<B2BPartnership />} />
                    <Route path="/b2b/support" element={<B2BSupport />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/notre-selection" element={<NotreSelection />} />
                    <Route path="/produit/:slug" element={<ProductDetail />} />
                    <Route path="/technology" element={<Technology />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/collection/:collectionSlug" element={<CollectionDetail />} />
                    <Route path="/welcome" element={
                      <ProtectedRoute>
                        <Welcome />
                      </ProtectedRoute>
                    } />
                    <Route path="/admin/sync" element={<AdminSync />} />
                    {/* Account Routes - Protected */}
                    <Route path="/account" element={
                      <ProtectedRoute>
                        <AccountLayout />
                      </ProtectedRoute>
                    }>
                      <Route path="dashboard" element={<Dashboard />} />
                      <Route path="profile" element={<Profile />} />
                      <Route path="orders" element={<OrdersPage />} />
                      <Route path="cart" element={<CartPage />} />
                      <Route path="favorites" element={<FavoritesPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Route>
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

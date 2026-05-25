import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import NotFound from "./pages/NotFound";
import GetInvolved from "./pages/GetInvolved";
import CreateBook from "./pages/CreateBook";
import About from "./pages/About";
import MyBooks from "./pages/MyBooks";
import Library from "./pages/Library";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SessionStatus } from "./components/SessionStatus";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <SessionStatus />
    <Routes>
      <Route path="/" element={<Discover />} />
      <Route path="/event/:id" element={<Index />} />
      <Route path="/event/:id/edit" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
      <Route path="/my-events" element={<ProtectedRoute><MyEvents /></ProtectedRoute>} />
      <Route path="/create-event" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/get-involved" element={<GetInvolved />} />
      <Route path="/create-book" element={<ProtectedRoute><CreateBook /></ProtectedRoute>} />
      <Route path="/about" element={<About />} />
      <Route path="/my-books" element={<ProtectedRoute><MyBooks /></ProtectedRoute>} />
      <Route path="/library" element={<Library />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </TooltipProvider>
);

export default App;

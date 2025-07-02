import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import LandingPage from "pages/landing-page";
import NewsAndUpdates from "pages/news-and-updates";
import AuthenticationLoginRegister from "pages/authentication-login-register";
import AdminPanelDashboard from "pages/admin-panel-dashboard";
import AnomalyTrackingDashboard from "pages/anomaly-tracking-dashboard";
import AnomalyReportingForm from "pages/anomaly-reporting-form";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/news-and-updates" element={<NewsAndUpdates />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/admin-panel-dashboard" element={<AdminPanelDashboard />} />
        <Route path="/anomaly-tracking-dashboard" element={<AnomalyTrackingDashboard />} />
        <Route path="/anomaly-reporting-form" element={<AnomalyReportingForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
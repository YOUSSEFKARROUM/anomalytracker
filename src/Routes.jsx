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
import UserManagementPage from "pages/UserManagementPage";
import AnomalySupervisionPage from "pages/AnomalySupervisionPage";
import ContentManagementPage from "pages/ContentManagementPage";
import SystemConfigurationPage from "pages/SystemConfigurationPage";
import ReportsPage from "pages/ReportsPage";
import NotificationsPage from "pages/NotificationsPage";
import SettingsPage from "pages/SettingsPage";
import RootLayout from "components/layouts/RootLayout";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/news-and-updates" element={<NewsAndUpdates />} />
        <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
        <Route path="/anomaly-tracking-dashboard" element={<AnomalyTrackingDashboard />} />
        <Route path="/anomaly-reporting-form" element={<AnomalyReportingForm />} />
        {/* Admin routes with layout */}
        <Route element={<RootLayout />}>
          <Route path="/admin-panel-dashboard" element={<AdminPanelDashboard />} />
          <Route path="/admin/user-management" element={<UserManagementPage />} />
          <Route path="/admin/anomaly-supervision" element={<AnomalySupervisionPage />} />
          <Route path="/admin/content-management" element={<ContentManagementPage />} />
          <Route path="/admin/system-configuration" element={<SystemConfigurationPage />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
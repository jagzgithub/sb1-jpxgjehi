import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AdminNav } from '../components/admin/AdminNav';
import { SystemAnalytics } from '../components/admin/SystemAnalytics';
import { UserManagementSection } from '../components/admin/users/UserManagementSection';
import { MatchUploadSection } from '../components/admin/matches/MatchUploadSection';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <AdminNav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Routes>
          <Route path="/" element={<SystemAnalytics />} />
          <Route path="/users" element={<UserManagementSection />} />
          <Route path="/matches" element={<MatchUploadSection />} />
        </Routes>
      </div>
    </div>
  );
}
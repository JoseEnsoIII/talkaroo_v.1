import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiBook, FiDollarSign, FiActivity } from "react-icons/fi";
import AdminSidebar from "../Admin-Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";
// Add new styled components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;
const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
`;


const AdminDashboard = () => {


  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />
       

        
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;
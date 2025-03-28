import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FiBook, FiClipboard, FiUsers, FiPenTool } from "react-icons/fi";
import { FaGamepad } from "react-icons/fa"; 

import AdminSidebar from "../Admin-Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 250px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const AdminActivity = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />

        <CardContainer>
          <Card onClick={() => handleCardClick("/admin/course-activities/vocabs")}> 
            <FiBook size={30} />
            <h3>Vocabulary</h3>
            <p>Expand your word bank with exercises.</p>
          </Card>
          <Card onClick={() => handleCardClick("/grammar")}>
            <FiClipboard size={30} />
            <h3>Grammar</h3>
            <p>Master grammar rules with quizzes.</p>
          </Card>
          <Card onClick={() => handleCardClick("/practice")}>
            <FiUsers size={30} />
            <h3>Practice</h3>
            <p>Sharpen your skills through exercises.</p>
          </Card>
          <Card onClick={() => handleCardClick("/community")}>
            <FiPenTool size={30} />
            <h3>Community</h3>
            <p>Engage with other learners and teachers.</p>
          </Card>
          <Card onClick={() => handleCardClick("/games")}>
            <FaGamepad size={30} />
            <h3>Games</h3>
            <p>Learn through fun and interactive games.</p>
          </Card>
        </CardContainer>
      </Content>
    </DashboardContainer>
  );
};

export default AdminActivity;

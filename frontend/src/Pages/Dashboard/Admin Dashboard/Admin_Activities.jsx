import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { 
  FiBook, FiActivity, FiUsers, FiAward, FiClipboard, 
  FiFileText, FiHeadphones, FiPenTool, FiFilm
} from "react-icons/fi";
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

const CourseSelector = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
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

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/api/courses")
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleCardClick = (activity) => {
    navigate(`/activity/${activity}`);
  };

  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />
        
        <CourseSelector onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="">Select a Language Course</option>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </CourseSelector>

        {selectedCourse && (
          <h2>
            Selected Course: {courses.find((course) => course.course_id === parseInt(selectedCourse))?.course_name}
          </h2>
        )}

        <CardContainer>
          <Card onClick={() => handleCardClick("vocabulary")}>
            <FiBook size={30} />
            <h3>Vocabulary Practice</h3>
            <p>Expand your word bank with interactive exercises.</p>
          </Card>
          <Card onClick={() => handleCardClick("listening")}>
            <FiHeadphones size={30} />
            <h3>Listening Exercises</h3>
            <p>Improve your comprehension with audio lessons.</p>
          </Card>
          <Card onClick={() => handleCardClick("speaking")}>
            <FiUsers size={30} />
            <h3>Speaking Drills</h3>
            <p>Practice pronunciation with speech recognition.</p>
          </Card>
          <Card onClick={() => handleCardClick("grammar")}>
            <FiClipboard size={30} />
            <h3>Grammar Tests</h3>
            <p>Master grammar rules with structured quizzes.</p>
          </Card>
          <Card onClick={() => handleCardClick("writing")}>
            <FiPenTool size={30} />
            <h3>Writing Exercises</h3>
            <p>Enhance your writing skills with guided tasks.</p>
          </Card>
          <Card onClick={() => handleCardClick("reading")}>
            <FiFileText size={30} />
            <h3>Reading Comprehension</h3>
            <p>Analyze texts and answer comprehension questions.</p>
          </Card>
          <Card onClick={() => handleCardClick("cultural-videos")}>
            <FiFilm size={30} />
            <h3>Cultural Insights</h3>
            <p>Learn through real-life videos and documentaries.</p>
          </Card>
          <Card onClick={() => handleCardClick("achievements")}>
            <FiAward size={30} />
            <h3>Achievements & Progress</h3>
            <p>Track your learning milestones and earned badges.</p>
          </Card>
        </CardContainer>
      </Content>
    </DashboardContainer>
  );
};

export default AdminDashboard;

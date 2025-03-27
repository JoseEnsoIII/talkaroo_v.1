import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import AdminSidebar from "../Admin-Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";
import Pagination from "../../Layout_Components/Pagination";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
`;

const Container = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #40a9ff;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 0.75rem;
  background-color: #f4f4f4;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: center;
`;

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    native_name: "",
    flag_url: "",
    description: "",
    course_level: "free",
    course_price: 0.0
  });
  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/courses");
      console.log(res.data); // Check what’s coming from backend
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  
  

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/courses", newCourse);
      setNewCourse({
        course_name: "",
        native_name: "",
        flag_url: "",
        description: "",
        course_level: "free",
        course_price: 0.0
      });
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };
  

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/courses/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <Container>
      <Heading>Language Course Management</Heading>
      <Form onSubmit={handleCreateCourse}>
  <Input type="text" placeholder="Course Name" value={newCourse.course_name} 
    onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })} required />
  <Input type="text" placeholder="Native Name" value={newCourse.native_name} 
    onChange={(e) => setNewCourse({ ...newCourse, native_name: e.target.value })} required />
  <Input type="text" placeholder="Flag URL" value={newCourse.flag_url} 
    onChange={(e) => setNewCourse({ ...newCourse, flag_url: e.target.value })} required />
  <Input type="text" placeholder="Description" value={newCourse.description} 
    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} required />
  <select value={newCourse.course_level} 
    onChange={(e) => setNewCourse({ ...newCourse, course_level: e.target.value })}>
    <option value="free">Free</option>
    <option value="intermediate">Intermediate</option>
    <option value="expert">Expert</option>
  </select>
  <Input type="number" placeholder="Course Price" value={newCourse.course_price} 
    onChange={(e) => setNewCourse({ ...newCourse, course_price: e.target.value })} required />
  <Button type="submit">Add Course</Button>
</Form>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Title</Th>
            <Th>Level</Th>
            <Th>Duration</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
  {courses.map((course) => (
    <tr key={course.course_id}> {/* Ensure it matches the DB field */}
      <Td>{course.course_id}</Td>
      <Td>{course.course_name}</Td>  {/* Ensure this matches backend response */}
      <Td>{course.levels || "N/A"}</Td> 
      <Td>{course.course_price}</Td>
      <Td>
        <Button onClick={() => handleDeleteCourse(course.course_id)} style={{ backgroundColor: "#ff4d4f" }}>
          Delete
        </Button>
      </Td>
    </tr>
  ))}
</tbody>

      </Table>
    </Container>
  );
};

const AdminCourses = () => {
  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />
        <CourseTable />
        <Pagination />
      </Content>
    </DashboardContainer>
  );
};

export default AdminCourses;

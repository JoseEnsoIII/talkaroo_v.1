import React from "react";
import styled from "styled-components";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";
import Sidebar from "../Sidebar";
import DashboardBanner from "../../Layout_Components/Dashboard_Banner";
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Title = styled.h1`
  color: #343a40;
  margin-bottom: 1.5rem;
`;

const TableContainer = styled.div`
  width: 95%;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #007bff;
  color: white;
  padding: 1rem;
  text-align: left;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: ${(props) => (props.delete ? "#dc3545" : "#28a745")};
  color: white;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.9rem;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const courses = [
  { id: 1, name: "React Basics", date: "2024-03-15" },
  { id: 2, name: "Advanced JavaScript", date: "2024-04-20" },
  { id: 3, name: "Node.js Essentials", date: "2024-05-10" },
];

const My_Course = () => {
  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
       <DashboardBanner />
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <Th>Course Name</Th>
                <Th>Date</Th>
                <Th>Certificate</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <Td>{course.name}</Td>
                  <Td>{course.date}</Td>
                  <Td>
                    <IconButton>
                      <FaDownload /> Download
                    </IconButton>
                  </Td>
                  <Td>
                    <ActionButtons>
                      <IconButton>
                        <FaEdit /> Update
                      </IconButton>
                      <IconButton delete>
                        <FaTrash /> Delete
                      </IconButton>
                    </ActionButtons>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </Content>
    </DashboardContainer>
  );
};

export default My_Course;

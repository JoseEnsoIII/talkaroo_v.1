import React from "react";
import styled from "styled-components";
import { FaDownload } from "react-icons/fa";
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

const IconButton = styled.button`
  background: #28a745;
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

const certificates = [
  { id: 1, name: "React Basics", status: "Available" },
  { id: 2, name: "Advanced JavaScript", status: "Processing" },
  { id: 3, name: "Node.js Essentials", status: "Available" },
];

const GenerateCertificate = () => {
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
                <Th>Status</Th>
                <Th>Certificate</Th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id}>
                  <Td>{cert.name}</Td>
                  <Td>{cert.status}</Td>
                  <Td>
                    {cert.status === "Available" ? (
                      <IconButton>
                        <FaDownload /> Download
                      </IconButton>
                    ) : (
                      "Processing"
                    )}
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

export default GenerateCertificate;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiPlus, FiEdit, FiTrash } from "react-icons/fi";
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CreateButton = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  background: #007bff;
  color: white;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: none;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ModalButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  flex: 1;
  &:first-child {
    background: #007bff;
    color: white;
  }
  &:last-child {
    background: #dc3545;
    color: white;
    margin-left: 10px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("http://localhost:5001/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const handleCreateBlog = () => {
    setModalOpen(false);
    setBlogs([...blogs, { id: blogs.length + 1, ...newBlog }]);
  };

  return (
    <DashboardContainer>
      <AdminSidebar />
      <Content>
        <DashboardBanner />
        <Header>
          <h2>Blog Dashboard</h2>
          <CreateButton onClick={() => setModalOpen(true)}>
            <FiPlus size={20} /> Create New Blog
          </CreateButton>
        </Header>
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <Td>{blog.title}</Td>
                <Td>
                  <ActionButtons>
                    <FiEdit size={20} style={{ cursor: "pointer", color: "#007bff" }} />
                    <FiTrash size={20} style={{ cursor: "pointer", color: "#dc3545" }} />
                  </ActionButtons>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {modalOpen && (
          <Modal>
            <ModalContent>
              <h3>Create New Blog</h3>
              <Input
                type="text"
                placeholder="Blog Title"
                value={newBlog.title}
                onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              />
              <Textarea
                placeholder="Blog Content"
                rows="4"
                value={newBlog.content}
                onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              />
              <ModalButtons>
                <ModalButton onClick={handleCreateBlog}>Submit</ModalButton>
                <ModalButton onClick={() => setModalOpen(false)}>Close</ModalButton>
              </ModalButtons>
            </ModalContent>
          </Modal>
        )}
      </Content>
    </DashboardContainer>
  );
};

export default BlogDashboard;
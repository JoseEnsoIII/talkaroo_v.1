import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import { FiUser, FiEdit } from "react-icons/fi";
import axios from "axios";

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f8f9fa;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const WelcomeMessage = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: #2d3748;
`;

const FormContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const FormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const InputGroup = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #6c757d;
  font-size: 0.875rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
`;

const SaveButton = styled.button`
  background: #4a90e2;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    background: #357abd;
  }
`;

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [editMode, setEditMode] = useState(false);
  const userId = 1; // Replace with actual user ID (e.g., from authentication)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, userData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <DashboardContainer>
      <Sidebar />
      <Content>
        <Header>
          <WelcomeMessage>Profile</WelcomeMessage>
        </Header>

        <FormContainer>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            {editMode ? (
              <>
                <SaveButton onClick={handleSave}>
                  <FiUser /> Save Changes
                </SaveButton>
                <SaveButton onClick={() => setEditMode(false)} style={{ background: "#6c757d" }}>
                  Cancel
                </SaveButton>
              </>
            ) : (
              <SaveButton onClick={() => setEditMode(true)}>
                <FiEdit /> Edit Profile
              </SaveButton>
            )}
          </div>

          <FormRow>
            <InputGroup>
              <Label>Username</Label>
              <Input
                value={userData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                disabled={!editMode}
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label>First Name</Label>
              <Input
                value={userData.first_name}
                onChange={(e) => handleInputChange("first_name", e.target.value)}
                disabled={!editMode}
              />
            </InputGroup>

            <InputGroup>
              <Label>Last Name</Label>
              <Input
                value={userData.last_name}
                onChange={(e) => handleInputChange("last_name", e.target.value)}
                disabled={!editMode}
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label>Email</Label>
              <Input
                value={userData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!editMode}
              />
            </InputGroup>
          </FormRow>

          <FormRow>
            <InputGroup>
              <Label>Password</Label>
              <Input
                type="password"
                value={userData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                disabled={!editMode}
              />
            </InputGroup>
          </FormRow>

          {editMode && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <SaveButton onClick={handleSave}>
                <FiUser /> Save Changes
              </SaveButton>
              <SaveButton onClick={() => setEditMode(false)} style={{ background: "#6c757d" }}>
                Cancel
              </SaveButton>
            </div>
          )}
        </FormContainer>
      </Content>
    </DashboardContainer>
  );
};

export default ProfilePage;

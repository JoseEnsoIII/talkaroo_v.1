import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
`;

const FormContainer = styled.div`
  max-width: 350px;
  height: 550px;
  width: 100%;
  padding: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: #fff;
  &:read-only {
    background: #e9ecef;
  }
`;

const Select = styled.select`
  padding: 12px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: #fff;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

const EnrollmentForm = () => {
  const { courseName } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const [level, setLevel] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/courses/name/${encodeURIComponent(courseName)}`
        );
        if (!response.ok) throw new Error("Course not found");
        const data = await response.json();
        setCourse(data);
        setError("");
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Course not found. Please try again.");
      }
    };

    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
          setUser(storedUser);
        } else {
          const response = await fetch("http://localhost:5001/api/user");
          if (!response.ok) throw new Error("User not found");
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data.");
      }
    };

    fetchCourse();
    fetchUser();
  }, [courseName]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.phone || !level) {
      alert("All fields are required.");
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(user.name)) {
      alert("Invalid name format.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      alert("Invalid email format.");
      return;
    }

    if (!/^[0-9]+$/.test(user.phone)) {
      alert("Phone number must contain only digits.");
      return;
    }

    if (level === "Basic") {
      navigate("/profile");
    } else {
      navigate("/payment");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Enroll in {course ? course.course_name : "Loading..."}</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <Label>Email:</Label>
          <Input type="email" value={user.email} readOnly required />

          <Label>Selected Course:</Label>
          <Input type="text" value={course ? course.course_name : "Loading..."} readOnly required />

          <Label>Choose Level:</Label>
          <Select value={level} onChange={(e) => setLevel(e.target.value)} required>
            <option value="">Select Level</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Select>

          <Button type="submit">Enroll Now</Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default EnrollmentForm;

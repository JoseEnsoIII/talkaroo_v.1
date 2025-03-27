import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  padding: 1rem;
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: #f9f9f9;
  &:focus {
    outline: none;
    border-color: #6e8efb;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background: #f9f9f9;
`;

const Button = styled.button`
  padding: 12px;
  background: #6e8efb;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #5a7ce6;
  }
`;

const EnrollmentForm = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email || !selectedCourseId || !level) {
      setError("All fields are required.");
      return;
    }

    if (!email.endsWith("@gmail.com")) {
      setError("Only Gmail addresses are allowed.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, course_id: selectedCourseId, level }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Successfully enrolled!");
        navigate(level === "Basic" ? "/profile" : "/payment");
      } else {
        setError(result.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      setError("Something went wrong.");
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Enroll in a Course</Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter Gmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            required
          >
            <option value="">Choose a Course</option>
            {courses.map((course) => (
              <option key={course.course_id} value={course.course_id}>
                {course.course_name}
              </option>
            ))}
          </Select>
          <Select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          >
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

import React from 'react'
import styled from "styled-components";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Register() {

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
      };


      const handleSubmit = async (event) => {
        event.preventDefault();

        if (itValidate()) {
          const { email, username, password } = values;
          const response  = await axios.post("http://localhost:3001/api/auth/register", {
                username,
                email,
                password,
              })
              console.log(response);
        } else {
          alert("Please fill in all fields");
        }

       

      };

      const itValidate = () => {
        const { username, email, password, confirmPassword } = values;
        if (username && email && password && confirmPassword) {
            return true;
        }
        if (password !== confirmPassword) {
            return false;
        }
        return false;
      }


  return (
    <>
    <FormContainer>
    <form action="" onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
    </FormContainer>
    </>
  )
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {

    padding: 1rem;
    border: 0.1rem solid black;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid red;
      outline: none;
    }
  }
  button {
    background-color: black;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
        background-color: #4e0eff;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: black;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;





export default Register
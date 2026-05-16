import React from "react";

import { Card, Form, Input, Button, message } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await API.post("/auth/login", values);

      localStorage.setItem("token", response.data);

      localStorage.setItem("username", values.username);

      message.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      message.error("Invalid Credentials");
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <div className="auth-logo-section">
          <img
            src={require("../assets/booklogo.jpg")}
            alt="logo"
            className="auth-logo"
          />
        </div>

        <h1 className="auth-title">Welcome Back</h1>

        <p className="auth-subtitle">Login to continue managing your books</p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter username",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Enter Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter Password"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="auth-button"
          >
            Login
          </Button>
        </Form>

        <div className="auth-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;

import React from "react";

import { Card, Form, Input, Button, message } from "antd";

import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await API.post("/auth/register", values);

      message.success("Registration Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      message.error("Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h1 className="auth-title">Create Account</h1>

        <p className="auth-subtitle">Register to manage your books</p>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Enter username",
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
                message: "Password is required",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter Password"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form>

        <div className="auth-link">
          Already have an account?
          <Link to="/"> Login</Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;

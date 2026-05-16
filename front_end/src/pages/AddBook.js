import React, { useState } from "react";

import { Card, Input, Button, Form, message } from "antd";

import NavbarComponent from "../components/NavbarComponent";

import API from "../services/api";

function AddBook() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await API.post("/books/add", values);

      message.success("Book Added Successfully");

      form.resetFields();
    } catch (error) {
      message.error("Failed to add book");
    }
  };

  return (
    <div>
      <NavbarComponent />

      <div style={{ padding: 40 }}>
        <Card title="Add Book">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="ISBN"
              name="isbn"
              rules={[
                {
                  required: true,
                  message: "ISBN is required",
                },
              ]}
            >
              <Input placeholder="Enter ISBN" />
            </Form.Item>

            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Title is required",
                },
              ]}
            >
              <Input placeholder="Enter Title" />
            </Form.Item>

            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Author is required",
                },
              ]}
            >
              <Input placeholder="Enter Author" />
            </Form.Item>

            <Form.Item
              label="Publication Year"
              name="publicationYear"
              rules={[
                {
                  required: true,
                  message: "Publication year required",
                },
                {
                  pattern: /^(19|20)\d{2}$/,
                  message: "Enter valid year",
                },
              ]}
            >
              <Input placeholder="Enter Year" />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Add Book
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default AddBook;

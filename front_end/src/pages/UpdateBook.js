import React, { useState } from "react";

import { Card, Form, Input, Button, message } from "antd";

import NavbarComponent from "../components/NavbarComponent";

import API from "../services/api";

function UpdateBook() {
  const [form] = Form.useForm();

  const updateBook = async (values) => {
    try {
      await API.put(`/books/update/${values.isbn}`, values);

      message.success("Book Updated");

      form.resetFields();
    } catch {
      message.error("Update Failed");
    }
  };

  return (
    <div>
      <NavbarComponent />

      <div style={{ padding: 40 }}>
        <Card title="Update Book">
          <Form form={form} layout="vertical" onFinish={updateBook}>
            <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="author"
              label="Author"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="publicationYear"
              label="Publication Year"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Button type="primary" htmlType="submit">
              Update Book
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
}

export default UpdateBook;

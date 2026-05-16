import React, { useEffect, useState } from "react";

import {
  Table,
  Button,
  Space,
  Card,
  Typography,
  message,
  Popconfirm,
} from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";

import API from "../services/api";

const { Title } = Typography;

function ViewBook() {
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books/getAll");

      setBooks(response.data);
    } catch (error) {
      console.log(error);

      message.error("Failed to fetch books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (isbn) => {
    try {
      await API.delete(`/books/delete/${isbn}`);

      message.success("Book Deleted Successfully");

      fetchBooks();
    } catch (error) {
      console.log(error);

      message.error("Delete Failed");
    }
  };

  const columns = [
    {
      title: "ISBN",
      dataIndex: "isbn",
      key: "isbn",
    },

    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },

    {
      title: "Publication Year",
      dataIndex: "publicationYear",
      key: "publicationYear",
    },

    {
      title: "Actions",

      key: "actions",

      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() =>
              navigate("/update-book", {
                state: record,
              })
            }
          >
            Edit
          </Button>

          <Popconfirm
            title="Delete this book?"
            onConfirm={() => handleDelete(record.isbn)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <NavbarComponent />

      <div style={{ padding: "30px" }}>
        <Card>
          <Title level={3}>View Books</Title>

          <Table
            columns={columns}
            dataSource={books}
            rowKey="isbn"
            bordered
            pagination={{
              pageSize: 5,
            }}
          />
        </Card>
      </div>
    </div>
  );
}

export default ViewBook;

import React, { useEffect, useState } from "react";

import { Card, Row, Col, Typography, Button, Table } from "antd";

import {
  BookOutlined,
  PlusCircleOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import NavbarComponent from "../components/NavbarComponent";

import API from "../services/api";

const { Title, Text } = Typography;

function Dashboard() {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);

  const username = localStorage.getItem("username") || "User";

  const fetchBooks = async () => {
    try {
      const response = await API.get("/books/getAll");

      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const columns = [
    {
      title: "ISBN",
      dataIndex: "isbn",
    },

    {
      title: "Title",
      dataIndex: "title",
    },

    {
      title: "Author",
      dataIndex: "author",
    },

    {
      title: "Year",
      dataIndex: "publicationYear",
    },
  ];

  return (
    <div>
      <NavbarComponent />

      <div className="page-container">
        <div className="dashboard-header">
          <div>
            <Title level={2}>Welcome back, {username} </Title>

            <Text className="dashboard-subtitle">
              Manage your digital library
            </Text>
          </div>
        </div>

        <Row gutter={20}>
          <Col span={8}>
            <Card className="stats-card">
              <BookOutlined className="stats-icon" />

              <h2>{books.length}</h2>

              <p>Total Books</p>
            </Card>
          </Col>

          <Col span={8}>
            <Card className="stats-card">
              <EditOutlined className="stats-icon" />

              <h2>{new Set(books.map((book) => book.author)).size}</h2>

              <p>Total Authors</p>
            </Card>
          </Col>

          <Col span={8}>
            <Card className="stats-card">
              <PlusCircleOutlined className="stats-icon" />

              <h2>{books.length > 0 ? "Active" : "0"}</h2>

              <p>Library Status</p>
            </Card>
          </Col>
        </Row>

        <Card className="recent-books-card" title="Recent Books">
          <Table
            columns={columns}
            dataSource={books.slice(0, 5)}
            rowKey="isbn"
            pagination={false}
          />
        </Card>

        <div className="footer">
          <p>© 2026 BookSphere. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

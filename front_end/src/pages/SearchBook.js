import React, { useState } from "react";

import { Card, Input, Button, Descriptions, message } from "antd";

import NavbarComponent from "../components/NavbarComponent";

import API from "../services/api";

function SearchBook() {
  const [isbn, setIsbn] = useState("");

  const [book, setBook] = useState(null);

  const searchBook = async () => {
    try {
      const response = await API.get(`/books/getbyisbn/${isbn}`);

      setBook(response.data);
    } catch {
      message.error("Book Not Found");
    }
  };

  return (
    <div>
      <NavbarComponent />

      <div style={{ padding: 40 }}>
        <Card title="Search Book">
          <Input
            placeholder="Enter ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />

          <Button type="primary" style={{ marginTop: 20 }} onClick={searchBook}>
            Search
          </Button>

          {book && (
            <Descriptions bordered style={{ marginTop: 30 }}>
              <Descriptions.Item label="ISBN">{book.isbn}</Descriptions.Item>

              <Descriptions.Item label="Title">{book.title}</Descriptions.Item>

              <Descriptions.Item label="Author">
                {book.author}
              </Descriptions.Item>

              <Descriptions.Item label="Year">
                {book.publicationYear}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Card>
      </div>
    </div>
  );
}

export default SearchBook;

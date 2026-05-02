package com.example.demo.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

import com.example.demo.entity.Book;
import com.example.demo.repo.BookRepository;
import com.example.demo.exception.*;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository repo;

    public List<Book> getAllBooks() {
        return repo.findAll();
    }

    public Book getBookByIsbn(String isbn) {
        return repo.findById(isbn)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
    }

    public Book addBook(Book book) {

        if (repo.existsById(book.getIsbn())) {
            throw new DuplicateResourceException("Book already exists with ISBN: " + book.getIsbn());
        }

        return repo.save(book);
    }

    public Book updateBook(String isbn, Book updatedBook) {
        Book book = getBookByIsbn(isbn);

        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setPublicationYear(updatedBook.getPublicationYear());

        return repo.save(book);
    }

    public void deleteBook(String isbn) {
        if (!repo.existsById(isbn)) {
            throw new ResourceNotFoundException("Book not found");
        }
        repo.deleteById(isbn);
    }
}
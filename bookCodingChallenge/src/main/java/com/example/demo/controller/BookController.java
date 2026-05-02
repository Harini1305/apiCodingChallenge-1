package com.example.demo.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

import com.example.demo.entity.Book;
import com.example.demo.service.BookService;

@RestController
@RequestMapping("/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService service;

    @GetMapping("/getAll")
    public List<Book> getAll() {
        return service.getAllBooks();
    }

    @GetMapping("getbyisbn/{isbn}")
    public Book getByIsbn(@PathVariable String isbn) {
        return service.getBookByIsbn(isbn);
    }

    @PostMapping("add")
    public Book create(@Valid @RequestBody Book book) {
        return service.addBook(book);
    }

    @PutMapping("update/{isbn}")
    public Book update(@PathVariable String isbn,
                       @Valid @RequestBody Book book) {
        return service.updateBook(isbn, book);
    }

    @DeleteMapping("delete/{isbn}")
    public String delete(@PathVariable String isbn) {
        service.deleteBook(isbn);
        return "Book deleted successfully";
    }
}
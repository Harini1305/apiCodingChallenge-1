package com.example.demo.service;

import com.example.demo.entity.Book;
import com.example.demo.repo.BookRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BookServiceTest {

    @Mock
    private BookRepository repo;

    @InjectMocks
    private BookService service;

    public BookServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllBooks() {
        List<Book> books = List.of(
                new Book("101", "Java", "James", 2020)
        );

        when(repo.findAll()).thenReturn(books);

        List<Book> result = service.getAllBooks();

        assertEquals(1, result.size());
    }

    @Test
    void testGetBookByIsbn() {
        Book book = new Book("101", "Java", "James", 2020);

        when(repo.findById("101")).thenReturn(Optional.of(book));

        Book result = service.getBookByIsbn("101");

        assertEquals("Java", result.getTitle());
    }

    @Test
    void testAddBook() {
        Book book = new Book("101", "Java", "James", 2020);

        when(repo.save(book)).thenReturn(book);

        Book result = service.addBook(book);

        assertNotNull(result);
    }

    @Test
    void testDeleteBook() {
        when(repo.existsById("101")).thenReturn(true);

        service.deleteBook("101");

        verify(repo, times(1)).deleteById("101");
    }
}
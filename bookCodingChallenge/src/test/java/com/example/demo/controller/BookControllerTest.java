package com.example.demo.controller;

import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(BookController.class)
@AutoConfigureMockMvc(addFilters = false)   
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService service;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllBooks() throws Exception {
        Mockito.when(service.getAllBooks())
                .thenReturn(List.of(new Book("101", "Java", "James", 2020)));

        mockMvc.perform(get("/books/getAll"))
        .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Java"));
    }

    @Test
    void testCreateBook() throws Exception {
        Book book = new Book("101", "Java", "James", 2020);

        Mockito.when(service.addBook(Mockito.any()))
                .thenReturn(book);
        
        mockMvc.perform(post("/books/add")
                .contentType(MediaType.APPLICATION_JSON)   
                .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isbn").value("101"));
    }
}
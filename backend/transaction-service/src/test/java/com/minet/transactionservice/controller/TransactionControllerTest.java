package com.minet.transactionservice.controller;

import com.minet.transactionservice.controller.TransactionController;
import com.minet.transactionservice.dto.TransactionDTO;
import com.minet.transactionservice.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void saveTransaction_shouldReturnCreatedStatus() {
        TransactionDTO transactionDTO = new TransactionDTO(/* provide necessary details */);
        when(transactionService.saveTransaction(any(TransactionDTO.class))).thenReturn(transactionDTO);

        ResponseEntity<TransactionDTO> responseEntity = transactionController.saveTransaction(transactionDTO);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertEquals(transactionDTO, responseEntity.getBody());
        verify(transactionService, times(1)).saveTransaction(any(TransactionDTO.class));
    }

    @Test
    void getAllTransactions_shouldReturnOkStatus() {
        int userId = 123;
        List<TransactionDTO> mockTransactions = Arrays.asList(new TransactionDTO(/* provide necessary details */));
        when(transactionService.getAllTransactions(userId)).thenReturn(mockTransactions);

        ResponseEntity<List<TransactionDTO>> responseEntity = transactionController.getAllTransactions(userId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockTransactions, responseEntity.getBody());
        verify(transactionService, times(1)).getAllTransactions(userId);
    }
}

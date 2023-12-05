package com.minet.transactionservice.service;

import com.minet.transactionservice.dto.TransactionDTO;
import com.minet.transactionservice.entity.Transaction;
import com.minet.transactionservice.exception.TransactionNotFoundException;
import com.minet.transactionservice.repository.TransactionRepository;
import com.minet.transactionservice.utils.TransactionMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TransactionServiceImplTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionServiceImpl transactionService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSaveTransaction() {
        TransactionDTO transactionDTO = createSampleTransactionDTO();
        Transaction transactionEntity = TransactionMapper.convertDtoToEntity(transactionDTO);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transactionEntity);
        TransactionDTO result = transactionService.saveTransaction(transactionDTO);

        assertNotNull(result);
        assertEquals(transactionDTO.getUserId(), result.getUserId());
        assertEquals(transactionDTO.getCryptoCurrencyId(), result.getCryptoCurrencyId());

        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void testGetAllTransactions() {
        int userId = 1;
        List<Transaction> transactionList = Collections.singletonList(createSampleTransaction());
        when(transactionRepository.findAllByUserId(userId)).thenReturn(transactionList);

        List<TransactionDTO> result = transactionService.getAllTransactions(userId);

        assertNotNull(result);
        assertFalse(result.isEmpty());

        verify(transactionRepository, times(1)).findAllByUserId(userId);
    }

    private TransactionDTO createSampleTransactionDTO() {
        TransactionDTO transactionDTO = new TransactionDTO();
        return transactionDTO;
    }

    private Transaction createSampleTransaction() {
        Transaction transaction = new Transaction();
        return transaction;
    }
}

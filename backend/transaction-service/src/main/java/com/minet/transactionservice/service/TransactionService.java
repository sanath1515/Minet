package com.minet.transactionservice.service;

import com.minet.transactionservice.dto.TransactionDTO;

import java.util.List;

public interface TransactionService {
    TransactionDTO saveTransaction(TransactionDTO transactionDTO);
    List<TransactionDTO> getAllTransactions(int userId);
}

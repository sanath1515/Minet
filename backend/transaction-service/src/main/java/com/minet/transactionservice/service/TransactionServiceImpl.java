package com.minet.transactionservice.service;

import com.minet.transactionservice.dto.TransactionDTO;
import com.minet.transactionservice.entity.Transaction;
import com.minet.transactionservice.exception.TransactionNotFoundException;
import com.minet.transactionservice.repository.TransactionRepository;
import com.minet.transactionservice.utils.TransactionMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public TransactionDTO saveTransaction(TransactionDTO transactionDTO) {
        Transaction newTransaction=TransactionMapper.convertDtoToEntity(transactionDTO);
        Transaction savedTransaction= transactionRepository.save(newTransaction);
        return TransactionMapper.convertEntityToDto(savedTransaction);
    }

    @Override
    public List<TransactionDTO> getAllTransactions(int userId) {
        List<Transaction> transactionList = transactionRepository.findAllByUserId(userId);
        return transactionList.stream()
                .map(TransactionMapper::convertEntityToDto)
                .toList();
    }
}

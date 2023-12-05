package com.minet.transactionservice.controller;

import com.minet.transactionservice.dto.TransactionDTO;
import com.minet.transactionservice.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/save")
    public ResponseEntity<TransactionDTO> saveTransaction(@RequestBody TransactionDTO transactionDTO) {
        TransactionDTO savedTransaction = transactionService.saveTransaction(transactionDTO);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions(@PathVariable int userId) {
        List<TransactionDTO> transactions = transactionService.getAllTransactions(userId);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }
}

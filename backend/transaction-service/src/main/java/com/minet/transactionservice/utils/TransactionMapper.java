package com.minet.transactionservice.utils;

import com.minet.transactionservice.dto.TransactionDTO;
import com.minet.transactionservice.entity.Transaction;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Component;

@Component
public class TransactionMapper {
    private static ModelMapper modelMapper;

    static {
        modelMapper=new ModelMapper();
    }

    public static Transaction convertDtoToEntity(TransactionDTO transactionDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(transactionDto,Transaction.class);
    }

    public static TransactionDTO convertEntityToDto(Transaction transaction){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(transaction,TransactionDTO.class);
    }
}

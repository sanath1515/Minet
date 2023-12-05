package com.minet.transactionservice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDTO {
    private int id;
    private String transactionType;
    private Date transactionDate;
    private String currencyName;
    private String currencySymbol;
    private Double currencyQuantity;
    private Double amount;
    private int userId;
    private int cryptoCurrencyId;
}

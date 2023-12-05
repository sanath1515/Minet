package com.minet.transactionservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

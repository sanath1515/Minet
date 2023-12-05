package com.minet.crypto_currencyservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CryptoCurrency {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(name = "symbol")
    private String abbreviation;

    @Column(name = "value")
    private Double price;

    @Column(name = "market_change")
    private Double change;

    @Column(name = "market_cap")
    private Double marketCap;

    private Double volume;

    private Double circulatingSupply;
}

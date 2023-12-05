package com.minet.crypto_currencyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CryptoCurrencyDto {
    private int id;

    private String name;

    private String abbreviation;

    private Double price;

    private Double change;

    private Double marketCap;

    private Double volume;

    private Double circulatingSupply;
}

package com.minet.crypto_currencyservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WatchListDto {
    private int id;
    private int cryptoCurrencyId;
    private int userId;
}

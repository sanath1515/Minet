package com.minet.crypto_currencyservice.service;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;

import java.util.List;

public interface CryptoCurrencyService {
    public List<CryptoCurrencyDto> getAllCryptoCurrencies();

    public CryptoCurrencyDto getCryptoCurrencyById(int id);
}

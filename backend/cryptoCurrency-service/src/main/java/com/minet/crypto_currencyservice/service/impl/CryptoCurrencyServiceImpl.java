package com.minet.crypto_currencyservice.service.impl;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.entity.CryptoCurrency;
import com.minet.crypto_currencyservice.exception.CryptoCurrencyNotFoundException;
import com.minet.crypto_currencyservice.repository.CryptoCurrencyRepository;
import com.minet.crypto_currencyservice.service.CryptoCurrencyService;
import com.minet.crypto_currencyservice.utils.CryptoCurrencyMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CryptoCurrencyServiceImpl implements CryptoCurrencyService {

    private final CryptoCurrencyRepository cryptoCurrencyRepository;

    private final CryptoCurrencyMapper cryptoCurrencyMapper;

    public CryptoCurrencyServiceImpl(CryptoCurrencyRepository cryptoCurrencyRepository,CryptoCurrencyMapper cryptoCurrencyMapper){
        this.cryptoCurrencyRepository = cryptoCurrencyRepository;
        this.cryptoCurrencyMapper = cryptoCurrencyMapper;
    }

    @Override
    public List<CryptoCurrencyDto> getAllCryptoCurrencies() {
        List<CryptoCurrency> cryptoCurrencyList = cryptoCurrencyRepository.findAll();
        return cryptoCurrencyList.stream().map(this::entityToDto).toList();
    }

    @Override
    public CryptoCurrencyDto getCryptoCurrencyById(int id) {
        Optional<CryptoCurrency> cryptoCurrency = Optional.ofNullable(cryptoCurrencyRepository.findById(id));
        if(cryptoCurrency.isEmpty())
            throw new CryptoCurrencyNotFoundException("Crypto Currency not found with id : " + id);
        return cryptoCurrencyMapper.convertEntityToDto(cryptoCurrency.get());
    }

    private CryptoCurrencyDto entityToDto(CryptoCurrency cryptoCurrency) {
        return cryptoCurrencyMapper.convertEntityToDto(cryptoCurrency);
    }
}

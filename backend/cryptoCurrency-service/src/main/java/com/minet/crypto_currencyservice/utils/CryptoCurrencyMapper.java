package com.minet.crypto_currencyservice.utils;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.entity.CryptoCurrency;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CryptoCurrencyMapper {
    private final ModelMapper modelMapper;

    public CryptoCurrencyMapper() {
        modelMapper = new ModelMapper();
    }

    public CryptoCurrency convertDtoToEntity(CryptoCurrencyDto cryptoCurrencyDto){
        return modelMapper.map(cryptoCurrencyDto, CryptoCurrency.class);
    }

    public CryptoCurrencyDto convertEntityToDto(CryptoCurrency cryptoCurrency){
        return modelMapper.map(cryptoCurrency, CryptoCurrencyDto.class);
    }
}

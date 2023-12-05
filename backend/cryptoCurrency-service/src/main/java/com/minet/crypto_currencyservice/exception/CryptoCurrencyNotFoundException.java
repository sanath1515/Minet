package com.minet.crypto_currencyservice.exception;

public class CryptoCurrencyNotFoundException extends RuntimeException {
    public CryptoCurrencyNotFoundException(String message) {
        super(message);
    }
}

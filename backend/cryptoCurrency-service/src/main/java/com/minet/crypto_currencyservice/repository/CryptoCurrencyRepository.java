package com.minet.crypto_currencyservice.repository;

import com.minet.crypto_currencyservice.entity.CryptoCurrency;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CryptoCurrencyRepository extends JpaRepository<CryptoCurrency, Integer> {
    public CryptoCurrency findById(int id);
}

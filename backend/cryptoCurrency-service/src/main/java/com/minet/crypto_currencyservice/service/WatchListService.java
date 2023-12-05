package com.minet.crypto_currencyservice.service;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.dto.WatchListDto;

import java.util.List;

public interface WatchListService {
    public WatchListDto handleCryptoWatchList(WatchListDto userCryptoCurrencyWatchlistDto);

    public List<CryptoCurrencyDto> getWatchListedCryptoByUserId(int userId);
}

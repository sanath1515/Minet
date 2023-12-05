package com.minet.crypto_currencyservice.controller;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.dto.WatchListDto;
import com.minet.crypto_currencyservice.service.CryptoCurrencyService;
import com.minet.crypto_currencyservice.service.WatchListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/crypto-currencies")
public class CryptoCurrencyController {

    private final CryptoCurrencyService cryptoCurrencyService;

    private final WatchListService watchListService;

    public CryptoCurrencyController(CryptoCurrencyService cryptoCurrencyService,WatchListService watchListService){
        this.cryptoCurrencyService = cryptoCurrencyService;
        this.watchListService = watchListService;
    }

    @GetMapping
    public List<CryptoCurrencyDto> getAllCryptoCurrencies() {
        return cryptoCurrencyService.getAllCryptoCurrencies();
    }

    @GetMapping("/{cryptoId}")
    public CryptoCurrencyDto getCryptoCurrencyById(@PathVariable int cryptoId) {
        return cryptoCurrencyService.getCryptoCurrencyById(cryptoId);
    }

    @GetMapping("/watchList/{userId}")
    public List<CryptoCurrencyDto> getWatchListedCryptoCurrencies(@PathVariable int userId) {
        return watchListService.getWatchListedCryptoByUserId(userId);
    }

    @PostMapping("/watchList")
    public WatchListDto watchListCryptoCurrency(@RequestBody WatchListDto userCryptoCurrencyWatchlistDto) {
        return watchListService.handleCryptoWatchList(userCryptoCurrencyWatchlistDto);
    }
}

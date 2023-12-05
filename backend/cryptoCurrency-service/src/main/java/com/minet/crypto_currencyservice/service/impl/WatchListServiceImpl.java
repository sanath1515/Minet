package com.minet.crypto_currencyservice.service.impl;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.dto.WatchListDto;
import com.minet.crypto_currencyservice.entity.WatchList;
import com.minet.crypto_currencyservice.exception.CryptoCurrencyNotFoundException;
import com.minet.crypto_currencyservice.repository.WatchListRepository;
import com.minet.crypto_currencyservice.service.CryptoCurrencyService;
import com.minet.crypto_currencyservice.service.WatchListService;
import com.minet.crypto_currencyservice.utils.WatchListMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchListServiceImpl implements WatchListService {

    private final WatchListRepository watchListRepository;

    private final CryptoCurrencyService cryptoCurrencyService;

    private final WatchListMapper watchListMapper;

    public WatchListServiceImpl(WatchListRepository watchListRepository,CryptoCurrencyService cryptoCurrencyService,WatchListMapper watchListMapper){
        this.watchListRepository = watchListRepository;
        this.cryptoCurrencyService = cryptoCurrencyService;
        this.watchListMapper = watchListMapper;
    }

    @Override
    public WatchListDto handleCryptoWatchList(WatchListDto watchListDto) {
        Optional<WatchList> existingWatchList = watchListRepository.findAll().stream()
                .filter(row -> row.getCryptoCurrencyId() == watchListDto.getCryptoCurrencyId() && row.getUserId() == watchListDto.getUserId())
                .findFirst();

        if (existingWatchList.isEmpty()) {
            WatchList newWatchList = watchListRepository.save(watchListMapper.convertDtoToEntity(watchListDto));
            return watchListMapper.convertEntityToDto(newWatchList);
        } else {
            existingWatchList.ifPresent(crypto -> watchListRepository.deleteById(crypto.getId()));
            return existingWatchList.map(watchListMapper::convertEntityToDto).orElse(null);
        }
    }

    @Override
    public List<CryptoCurrencyDto> getWatchListedCryptoByUserId(int userId) {
        List<WatchList> userCryptoCurrencyWatchLists = watchListRepository.findAll()
                .stream()
                .filter(row -> row.getUserId() == userId)
                .toList();
        return userCryptoCurrencyWatchLists.stream()
                .map(watchlist -> cryptoCurrencyService.getCryptoCurrencyById(watchlist.getCryptoCurrencyId()))
                .toList();
    }

}

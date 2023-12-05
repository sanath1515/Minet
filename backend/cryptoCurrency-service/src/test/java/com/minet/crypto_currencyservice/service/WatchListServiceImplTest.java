package com.minet.crypto_currencyservice.service;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.dto.WatchListDto;
import com.minet.crypto_currencyservice.entity.WatchList;
import com.minet.crypto_currencyservice.exception.CryptoCurrencyNotFoundException;
import com.minet.crypto_currencyservice.repository.WatchListRepository;
import com.minet.crypto_currencyservice.service.impl.WatchListServiceImpl;
import com.minet.crypto_currencyservice.utils.WatchListMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WatchListServiceImplTest {

    @Mock
    private WatchListRepository watchListRepository;

    @Mock
    private CryptoCurrencyService cryptoCurrencyService;

    @Mock
    private WatchListMapper watchListMapper;

    @InjectMocks
    private WatchListServiceImpl watchListServiceImpl;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testHandleCryptoWatchListSave() {
        WatchListDto watchlistDto = new WatchListDto(1, 100, 200);
        WatchList watchlistEntity = new WatchList(1, 100, 200);
        WatchList savedEntity = new WatchList(1, 100, 200);
        List<WatchList> cryptoWatchList = new ArrayList<>();

        WatchList watchList1 = new WatchList(1,1,2);
        WatchList watchList2 = new WatchList(2,100,150);
        WatchList watchList3 = new WatchList(3,100,3);
        WatchList watchList4 = new WatchList(4,3,200);
        cryptoWatchList.add(watchList1);
        cryptoWatchList.add(watchList2);
        cryptoWatchList.add(watchList3);
        cryptoWatchList.add(watchList4);

        when(watchListRepository.findAll()).thenReturn(cryptoWatchList);
        when(watchListRepository.save(any())).thenReturn(savedEntity);
        when(watchListMapper.convertDtoToEntity(any())).thenReturn(watchlistEntity);
        when(watchListMapper.convertEntityToDto(any())).thenReturn(watchlistDto);

        WatchListDto result = watchListServiceImpl.handleCryptoWatchList(watchlistDto);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals(100, result.getCryptoCurrencyId());
        assertEquals(200, result.getUserId());

        verify(watchListRepository, times(1)).save(any());
    }

    @Test
    void testHandleCryptoWatchListRemove() {
        WatchListDto watchlistDto = new WatchListDto(1, 100, 200);
        WatchList watchlistEntity = new WatchList(1, 100, 200);
        WatchList savedEntity = new WatchList(1, 100, 200);

        when(watchListRepository.findAll()).thenReturn(Arrays.asList(watchlistEntity));
        doNothing().when(watchListRepository).deleteById(anyInt());
        when(watchListMapper.convertDtoToEntity(any())).thenReturn(watchlistEntity);
        when(watchListMapper.convertEntityToDto(any())).thenReturn(watchlistDto);

        WatchListDto result = watchListServiceImpl.handleCryptoWatchList(watchlistDto);

        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals(100, result.getCryptoCurrencyId());
        assertEquals(200, result.getUserId());

        verify(watchListRepository, times(1)).deleteById(anyInt());
    }


    @Test
    void testGetWatchListedCryptoByUserId() {
        int userId = 200;
        WatchList watchlist1 = new WatchList(1, 100, userId);
        WatchList watchlist2 = new WatchList(2, 200, 100);
        List<WatchList> watchlistList = Arrays.asList(watchlist1, watchlist2);

        when(watchListRepository.findAll()).thenReturn(watchlistList);

        CryptoCurrencyDto cryptoCurrencyDto1 = new CryptoCurrencyDto(100, "Bitcoin", "BTC", 50000.0, 0.05, 1.0e12, 1.0e10, 1.0e7);
        CryptoCurrencyDto cryptoCurrencyDto2 = new CryptoCurrencyDto(200, "Ethereum", "ETH", 3000.0, -0.02, 2.0e11, 5.0e9, 7.0e6);

        when(cryptoCurrencyService.getCryptoCurrencyById(100)).thenReturn(cryptoCurrencyDto1);
        when(cryptoCurrencyService.getCryptoCurrencyById(200)).thenReturn(cryptoCurrencyDto2);

        List<CryptoCurrencyDto> result = watchListServiceImpl.getWatchListedCryptoByUserId(userId);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Bitcoin", result.get(0).getName());
    }
}

package com.minet.crypto_currencyservice.controller;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.dto.WatchListDto;
import com.minet.crypto_currencyservice.service.CryptoCurrencyService;
import com.minet.crypto_currencyservice.service.WatchListService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CryptoCurrencyControllerTest {

    @Mock
    private CryptoCurrencyService cryptoCurrencyService;

    @Mock
    private WatchListService watchListService;

    @InjectMocks
    private CryptoCurrencyController cryptoCurrencyController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(cryptoCurrencyController).build();
    }

    @Test
    void testGetAllCryptoCurrencies() throws Exception {
        List<CryptoCurrencyDto> cryptoCurrencyList = Arrays.asList(
                new CryptoCurrencyDto(1, "Bitcoin", "BTC", 50000.0, 0.05, 1.0e12, 1.0e10, 1.0e7),
                new CryptoCurrencyDto(2, "Ethereum", "ETH", 3000.0, -0.02, 2.0e11, 5.0e9, 7.0e6)
        );

        when(cryptoCurrencyService.getAllCryptoCurrencies()).thenReturn(cryptoCurrencyList);

        mockMvc.perform(MockMvcRequestBuilders.get("/crypto-currencies")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Bitcoin"))
                .andExpect(jsonPath("$[1].name").value("Ethereum"));

        verify(cryptoCurrencyService, times(1)).getAllCryptoCurrencies();
    }

    @Test
    void testGetCryptoCurrencyById() throws Exception {
        CryptoCurrencyDto cryptoCurrency = new CryptoCurrencyDto(1, "Bitcoin", "BTC", 50000.0, 0.05, 1.0e12, 1.0e10, 1.0e7);
        when(cryptoCurrencyService.getCryptoCurrencyById(1)).thenReturn(cryptoCurrency);

        mockMvc.perform(MockMvcRequestBuilders.get("/crypto-currencies/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.name").value("Bitcoin"));

        verify(cryptoCurrencyService, times(1)).getCryptoCurrencyById(1);
    }

    @Test
    void testGetWatchListedCryptoCurrencies() throws Exception {
        List<CryptoCurrencyDto> watchListedCryptoCurrencies = Arrays.asList(
                new CryptoCurrencyDto(1, "Bitcoin", "BTC", 50000.0, 0.05, 1.0e12, 1.0e10, 1.0e7),
                new CryptoCurrencyDto(2, "Ethereum", "ETH", 3000.0, -0.02, 2.0e11, 5.0e9, 7.0e6)
        );

        when(watchListService.getWatchListedCryptoByUserId(1)).thenReturn(watchListedCryptoCurrencies);

        mockMvc.perform(MockMvcRequestBuilders.get("/crypto-currencies/watchList/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].name").value("Bitcoin"))
                .andExpect(jsonPath("$[1].name").value("Ethereum"));

        verify(watchListService, times(1)).getWatchListedCryptoByUserId(1);
    }

    @Test
    void testWatchListCryptoCurrency() throws Exception {
        WatchListDto watchlistDto = new WatchListDto(1, 100, 200);

        when(watchListService.handleCryptoWatchList(any(WatchListDto.class))).thenReturn(watchlistDto);

        mockMvc.perform(MockMvcRequestBuilders.post("/crypto-currencies/watchList")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\":1,\"cryptoCurrencyId\":100,\"userId\":200}"))  // JSON representation of watchlistDto
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.cryptoCurrencyId").value(100))
                .andExpect(jsonPath("$.userId").value(200));

        verify(watchListService, times(1)).handleCryptoWatchList(any(WatchListDto.class));
    }
}

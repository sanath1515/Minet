package com.minet.crypto_currencyservice.service;

import com.minet.crypto_currencyservice.dto.CryptoCurrencyDto;
import com.minet.crypto_currencyservice.entity.CryptoCurrency;
import com.minet.crypto_currencyservice.exception.CryptoCurrencyNotFoundException;
import com.minet.crypto_currencyservice.exception.ErrorResponse;
import com.minet.crypto_currencyservice.exception.ExceptionHandler;
import com.minet.crypto_currencyservice.repository.CryptoCurrencyRepository;
import com.minet.crypto_currencyservice.service.impl.CryptoCurrencyServiceImpl;
import com.minet.crypto_currencyservice.utils.CryptoCurrencyMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CryptoCurrencyServiceImplTest {

    @Mock
    private CryptoCurrencyRepository cryptoCurrencyRepository;

    @Mock
    private CryptoCurrencyMapper cryptoCurrencyMapper;

    @InjectMocks
    private CryptoCurrencyServiceImpl cryptoCurrencyService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCryptoCurrencies() {
        CryptoCurrency cryptoCurrency = new CryptoCurrency(1, "Bitcoin", "BTC", 50000.0, 0.05, 1.0e12, 1.0e10, 1.0e7);

        List<CryptoCurrency> cryptoCurrencyList = Arrays.asList(cryptoCurrency);

        when(cryptoCurrencyRepository.findAll()).thenReturn(cryptoCurrencyList);

        CryptoCurrencyDto cryptoCurrencyDto = new CryptoCurrencyDto(1, "Bitcoin", "BTC", 50000.0, 0.05, 1.0e12, 1.0e10, 1.0e7);

        when(cryptoCurrencyMapper.convertEntityToDto(any())).thenReturn(cryptoCurrencyDto);

        List<CryptoCurrencyDto> result = cryptoCurrencyService.getAllCryptoCurrencies();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Bitcoin", result.get(0).getName());
    }

    @Test
    void testGetCryptoCurrencyById() {
        int cryptoCurrencyId = 1;
        CryptoCurrency cryptoCurrency = new CryptoCurrency();
        cryptoCurrency.setId(cryptoCurrencyId);
        cryptoCurrency.setName("Bitcoin");
        cryptoCurrency.setAbbreviation("BTC");
        cryptoCurrency.setPrice(50000.0);
        cryptoCurrency.setChange(0.05);
        cryptoCurrency.setMarketCap(1.0e12);
        cryptoCurrency.setVolume(1.0e10);
        cryptoCurrency.setCirculatingSupply(1.0e7);

        when(cryptoCurrencyRepository.findById(cryptoCurrencyId)).thenReturn(cryptoCurrency);

        CryptoCurrencyDto cryptoCurrencyDto = new CryptoCurrencyDto();
        cryptoCurrencyDto.setId(cryptoCurrencyId);
        cryptoCurrencyDto.setName("Bitcoin");
        cryptoCurrencyDto.setAbbreviation("BTC");
        cryptoCurrencyDto.setPrice(50000.0);
        cryptoCurrencyDto.setChange(0.05);
        cryptoCurrencyDto.setMarketCap(1.0e12);
        cryptoCurrencyDto.setVolume(1.0e10);
        cryptoCurrencyDto.setCirculatingSupply(1.0e7);

        when(cryptoCurrencyMapper.convertEntityToDto(cryptoCurrency)).thenReturn(cryptoCurrencyDto);

        CryptoCurrencyDto result = cryptoCurrencyService.getCryptoCurrencyById(cryptoCurrencyId);

        assertNotNull(result);
        assertEquals(cryptoCurrencyId, result.getId());
        assertEquals("Bitcoin", result.getName());
    }

    @Test
    void testGetCryptoCurrencyByIdNotFound() {
        int cryptoCurrencyId = 1;
        assertThrows(CryptoCurrencyNotFoundException.class, () -> cryptoCurrencyService.getCryptoCurrencyById(cryptoCurrencyId));
    }

    @Test
    void testGetCryptoCurrencyByIdNotFoundException() {
        int cryptoCurrencyId = 1;
        CryptoCurrencyNotFoundException cryptoCurrencyNotFoundException = new CryptoCurrencyNotFoundException("Np crypto currency found with id : " + cryptoCurrencyId);
        ExceptionHandler exceptionHandler = new ExceptionHandler();
        ResponseEntity<ErrorResponse> response = exceptionHandler.handleException(cryptoCurrencyNotFoundException);
        assertEquals(HttpStatus.NOT_FOUND.value(),response.getStatusCode().value());
    }


    @Test
    void testErrorResponse() {
        ErrorResponse errorResponse = new ErrorResponse();
        Long time = System.currentTimeMillis();
        errorResponse.setStatus(404);
        errorResponse.setMessage("Not Found");
        errorResponse.setTimeStamp(time);

        assertEquals(404, errorResponse.getStatus());
        assertEquals("Not Found", errorResponse.getMessage());
        assertEquals(time,errorResponse.getTimeStamp());
    }
}

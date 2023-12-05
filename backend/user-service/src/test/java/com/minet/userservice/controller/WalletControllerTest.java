package com.minet.userservice.controller;
import com.minet.userservice.dto.WalletDto;
import com.minet.userservice.service.WalletService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class WalletControllerTest {

    @Mock
    private WalletService walletService;

    @InjectMocks
    private WalletController walletController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveWallet_ReturnsCreatedResponse() {
        WalletDto walletDto = new WalletDto(1, 100L, 1);
        when(walletService.saveWallet(any(WalletDto.class))).thenReturn(walletDto);
        ResponseEntity<WalletDto> responseEntity = walletController.saveWallet(walletDto);
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(walletDto, responseEntity.getBody());
    }

    @Test
    void updateWallet_ReturnsOkResponse() {
        int userId = 1;
        WalletDto walletDto = new WalletDto(1, 100L, userId);
        when(walletService.getWalletByUserId(userId)).thenReturn(walletDto);
        ResponseEntity<WalletDto> responseEntity = walletController.updateWallet(userId);
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(walletDto, responseEntity.getBody());
    }

    @Test
    void updateBalance_ReturnsOkResponse() {
        int userId = 1;
        WalletDto walletDto = new WalletDto(1, 200L, userId);
        WalletDto updatedWalletDto = new WalletDto(1, 200L, userId);
        when(walletService.updateWalletByUserId(eq(userId), any(WalletDto.class))).thenReturn(updatedWalletDto);
        ResponseEntity<WalletDto> responseEntity = walletController.updateBalance(userId, walletDto);
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(updatedWalletDto, responseEntity.getBody());
    }
}

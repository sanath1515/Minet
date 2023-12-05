package com.minet.userservice.service;
import com.minet.userservice.dto.WalletDto;
import com.minet.userservice.entity.Wallet;
import com.minet.userservice.exception.WalletNotFoundException;
import com.minet.userservice.repository.WalletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class WalletServiceTest {

    @Mock
    private WalletRepository walletRepository;

    @InjectMocks
    private WalletServiceImpl walletService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getWalletByUserId_ReturnsWalletDto() {
        int userId = 1;
        Wallet wallet = new Wallet(1, 100L, userId);
        when(walletRepository.findWalletByUserId(userId)).thenReturn(wallet);
        WalletDto result = walletService.getWalletByUserId(userId);
        assertNotNull(result);
        assertEquals(wallet.getBalance(), result.getBalance());
        assertEquals(wallet.getUserId(), result.getUserId());
    }

    @Test
    void updateWalletByUserId_WalletFound_ReturnsUpdatedWalletDto() {
        int userId = 1;
        WalletDto walletDto = new WalletDto(1, 200L, userId);
        Wallet existingWallet = new Wallet(1, 100L, userId);
        when(walletRepository.findWalletByUserId(userId)).thenReturn(existingWallet);
        when(walletRepository.save(any(Wallet.class))).thenReturn(existingWallet);
        WalletDto result = walletService.updateWalletByUserId(userId, walletDto);
        assertNotNull(result);
        assertEquals(walletDto.getBalance(), result.getBalance());
        assertEquals(walletDto.getUserId(), result.getUserId());
    }

    @Test
    void updateWalletByUserId_WalletNotFound_ThrowsException() {
        int userId = 1;
        WalletDto walletDto = new WalletDto(1, 200L, userId);
        when(walletRepository.findWalletByUserId(userId)).thenReturn(null);
        assertThrows(WalletNotFoundException.class, () -> walletService.updateWalletByUserId(userId, walletDto));
    }

    @Test
    void saveWallet_ReturnsSavedWalletDto() {
        WalletDto walletDto = new WalletDto(1, 100L, 1);
        Wallet savedWallet = new Wallet(1, 100L, 1);
        when(walletRepository.save(any(Wallet.class))).thenReturn(savedWallet);
        WalletDto result = walletService.saveWallet(walletDto);
        assertNotNull(result);
        assertEquals(savedWallet.getBalance(), result.getBalance());
        assertEquals(savedWallet.getUserId(), result.getUserId());
    }
}


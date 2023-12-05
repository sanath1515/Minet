package com.minet.userservice.service;

import com.minet.userservice.dto.WalletDto;

public interface WalletService {

    WalletDto getWalletByUserId(int userId);

    WalletDto updateWalletByUserId(int userId,WalletDto walletDto);

    WalletDto saveWallet(WalletDto walletDto);
}

package com.minet.userservice.service;

import com.minet.userservice.dto.WalletDto;
import com.minet.userservice.entity.Wallet;
import com.minet.userservice.exception.WalletNotFoundException;
import com.minet.userservice.repository.WalletRepository;
import com.minet.userservice.utils.WalletMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService{

    private final WalletRepository walletRepository;
    public WalletServiceImpl(WalletRepository walletRepository){
        this.walletRepository=walletRepository;
    }

    @Override
    public WalletDto getWalletByUserId(int userId) {
        Wallet wallet=walletRepository.findWalletByUserId(userId);
        return WalletMapper.convertEntityToDto(wallet);
    }

    @Override
    public WalletDto updateWalletByUserId(int userId,WalletDto walletDto) {
       Optional<Wallet> wallet = Optional.ofNullable(walletRepository.findWalletByUserId(userId));
       if(wallet.isPresent()){
           Wallet wallet1 =wallet.get();
           wallet1.setBalance(walletDto.getBalance());
           walletRepository.save(wallet1);
           return WalletMapper.convertEntityToDto(wallet1);
       }
       else{
           throw new WalletNotFoundException("wallet not found with userId:"+userId);
       }
    }

    @Override
    public WalletDto saveWallet(WalletDto walletDto) {
        Wallet wallet=walletRepository.save(WalletMapper.convertDtoToEntity(walletDto));
        return WalletMapper.convertEntityToDto(wallet);
    }
}

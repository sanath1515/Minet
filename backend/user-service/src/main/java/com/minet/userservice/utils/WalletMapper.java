package com.minet.userservice.utils;

import com.minet.userservice.dto.WalletDto;
import com.minet.userservice.entity.Wallet;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

public class WalletMapper {
    private static ModelMapper modelMapper;

    static {
        modelMapper=new ModelMapper();
    }

    public static Wallet convertDtoToEntity(WalletDto walletDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(walletDto,Wallet.class);
    }

    public static WalletDto convertEntityToDto(Wallet wallet){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(wallet,WalletDto.class);
    }

}

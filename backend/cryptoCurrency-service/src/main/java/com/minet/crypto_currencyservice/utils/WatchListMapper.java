package com.minet.crypto_currencyservice.utils;

import com.minet.crypto_currencyservice.dto.WatchListDto;
import com.minet.crypto_currencyservice.entity.WatchList;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class WatchListMapper {
    private final ModelMapper modelMapper;

    public WatchListMapper(){
        modelMapper = new ModelMapper();
    }

    public WatchList convertDtoToEntity(WatchListDto watchListDto){
        return modelMapper.map(watchListDto, WatchList.class);
    }

    public WatchListDto convertEntityToDto(WatchList watchList){
        return modelMapper.map(watchList, WatchListDto.class);
    }
}

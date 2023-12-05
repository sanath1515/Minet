package com.minet.crypto_currencyservice.repository;

import com.minet.crypto_currencyservice.entity.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchListRepository extends JpaRepository<WatchList,Integer> {
    public WatchList findByUserId(int userId);
}

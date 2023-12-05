package com.minet.userservice.repository;

import com.minet.userservice.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WalletRepository extends JpaRepository<Wallet,Integer> {
    Wallet findWalletByUserId(int userId);
}

package com.minet.userservice.controller;
import com.minet.userservice.dto.WalletDto;
import com.minet.userservice.service.WalletService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    private final WalletService walletService;

    public WalletController(WalletService walletService){
        this.walletService=walletService;
    }

    @PostMapping("/save")
    public ResponseEntity<WalletDto> saveWallet(@RequestBody WalletDto walletDto){
        return new ResponseEntity<>(walletService.saveWallet(walletDto),HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<WalletDto> updateWallet(@PathVariable Integer userId){
        WalletDto walletDto = walletService.getWalletByUserId(userId);
        return new ResponseEntity<>(walletDto,HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<WalletDto> updateBalance(@PathVariable Integer userId,@RequestBody WalletDto walletDto){
        WalletDto updateWallet = walletService.updateWalletByUserId(userId,walletDto);
        return new ResponseEntity<>(updateWallet,HttpStatus.OK);
    }
}
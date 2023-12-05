package com.minet.userservice.exception;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WalletNotFoundExceptionTest {

    @Test
    void constructor_SetsMessage() {
        String errorMessage = "Wallet not found";
        WalletNotFoundException exception = new WalletNotFoundException(errorMessage);
        assertEquals(errorMessage, exception.getMessage());
    }

}

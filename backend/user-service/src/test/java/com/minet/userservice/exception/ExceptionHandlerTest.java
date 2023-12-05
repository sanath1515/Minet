package com.minet.userservice.exception;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.junit.jupiter.api.Assertions.assertEquals;

class ExceptionHandlerTest {
    private final ExceptionHandler exceptionHandler = new ExceptionHandler();

    @Test
    void handleException_UserNotFoundException_ReturnsNotFoundResponse() {
        UserNotFoundException userNotFoundException = new UserNotFoundException("User not found");
        ResponseEntity<ErrorResponse> responseEntity = exceptionHandler.handleException(userNotFoundException);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("User not found", responseEntity.getBody().getMessage());
    }

    @Test
    void handleException_WalletNotFoundException_ReturnsNotFoundResponse() {
        WalletNotFoundException walletNotFoundException = new WalletNotFoundException("Wallet not found");
        ResponseEntity<ErrorResponse> responseEntity = exceptionHandler.handleException(walletNotFoundException);
        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Wallet not found", responseEntity.getBody().getMessage());
    }
}

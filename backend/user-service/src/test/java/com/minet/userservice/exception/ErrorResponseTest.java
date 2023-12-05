package com.minet.userservice.exception;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ErrorResponseTest {

    @Test
    void gettersAndSetters_WorkAsExpected() {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setStatus(404);
        errorResponse.setMessage("Not Found");
        errorResponse.setTimeStamp(System.currentTimeMillis());
        assertEquals(404, errorResponse.getStatus());
        assertEquals("Not Found", errorResponse.getMessage());
        assertTrue(errorResponse.getTimeStamp() > 0);
    }

    @Test
    void noArgsConstructor_CreatesObject() {
        ErrorResponse errorResponse = new ErrorResponse();
        assertNotNull(errorResponse);
    }
}

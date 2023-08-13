package com.ssafy.howdoilook.global.handler;

public class NoContentException extends RuntimeException {

    public NoContentException(String message) {
        super(message);
    }

    public NoContentException() {
        super();
    }

    public NoContentException(String message, Throwable cause) {
        super(message, cause);
    }

    public NoContentException(Throwable cause) {
        super(cause);
    }

    protected NoContentException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}

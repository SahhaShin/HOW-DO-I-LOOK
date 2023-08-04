package com.ssafy.howdoilook.global.handler;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoContentException.class)
    public ResponseEntity<?> NoContentException(NoContentException noContentException) {
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .body(noContentException.getMessage());
    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> handleOtherException(Exception exception){
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body(exception.getStackTrace());
//    }

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<String> handleOtherException(Exception exception){
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body(exception.getMessage());
//    }

//    @ExceptionHandler(EmptyResultDataAccessException.class)
//    public ResponseEntity<String> handleEmptyResultData(EmptyResultDataAccessException exception){
//        return ResponseEntity
//                .status(HttpStatus.NOT_FOUND)
//                .body(exception.getMessage());
//    }
//
//    @ExceptionHandler(IllegalArgumentException.class)
//    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException exception){
//        return ResponseEntity
//                .status(HttpStatus.BAD_REQUEST)
//                .body(exception.getMessage());
//    }

//    // S3 이미지 업로드 실패 예외 핸들러
//    @ExceptionHandler(RuntimeException.class)
//    public ResponseEntity<String> handleS3UploadFailure(RuntimeException exception) {
//        return ResponseEntity
//                .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                .body(exception.getMessage());
//    }

//    @ExceptionHandler(AccessException.class)
//    public ResponseEntity<String> handleAccessException(AccessException exception){
//        return ResponseEntity.status(HttpStatus.FORBIDDEN)
//                .body(exception.getMessage());
//    }

}

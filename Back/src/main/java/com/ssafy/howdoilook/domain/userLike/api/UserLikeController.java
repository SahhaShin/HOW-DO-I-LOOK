package com.ssafy.howdoilook.domain.userLike.api;

import com.ssafy.howdoilook.domain.userLike.dto.request.ScoreSaveRequestDto;
import com.ssafy.howdoilook.domain.userLike.service.UserLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.expression.AccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/userlike")
public class UserLikeController {

    private final UserLikeService userLikeService;

    @PostMapping("/")
    public ResponseEntity<Long> saveScore(@RequestBody ScoreSaveRequestDto scoreSaveRequestDto) throws AccessException {

        return ResponseEntity.status(HttpStatus.CREATED).body(userLikeService.saveScore(scoreSaveRequestDto));
    }
}

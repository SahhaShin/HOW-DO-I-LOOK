package com.ssafy.howdoilook.global.redis.api;

import com.amazonaws.Response;
import com.ssafy.howdoilook.global.redis.service.RedisRankingService;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Getter
@RequestMapping("/api/ranking")
public class RedisRankingController {

    private final RedisRankingService redisRankingService;

    @ApiOperation(value = "좋아요 종류 별 전체 랭킹 조회")
    @GetMapping("/list/{likeType}")
    public ResponseEntity<?> getRankingList(@PathVariable String likeType) {

        return ResponseEntity.ok()
                .body(redisRankingService.getRanking(likeType));
    }
    
    @ApiOperation(value = "특정 유저의 좋아요 종류 별 랭킹 조회")
    @GetMapping("/{userId}/{likeType}")
    public ResponseEntity<?> getRankByUserId(@PathVariable Long userId, @PathVariable String likeType) {

        return ResponseEntity.ok()
                .body(redisRankingService.getRank(likeType, userId));
    }
}
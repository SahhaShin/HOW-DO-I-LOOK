package com.ssafy.howdoilook.global.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RedisRefreshTokenService {

    private final RedisTemplate redisTemplate;

    /*
    * Key-Value 설정
    * */
    @Transactional
    public void setRedisValue(String refreshToken, String email) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        valueOperations.set(refreshToken, email, Duration.ofMinutes(20160));
    }

    /*
    * Key-Value 삭제
    * */
    @Transactional
    public void deleteValues(String refreshToken) {
        redisTemplate.delete(refreshToken);
    }

    /*
    * Key로 Value 조회
    * */
    public String getRedisValue(String refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        return valueOperations.get(refreshToken);
    }

}

package com.ssafy.howdoilook.global.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
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
    public void setRedisRefreshToken(String refreshToken, String email) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        valueOperations.set("[RefreshToken] : " + refreshToken, email, Duration.ofMinutes(20160));
        valueOperations.set(email, "[RefreshToken] : " + refreshToken, Duration.ofMinutes(20160));
    }

    /*
    * Key-Value 삭제
    * */
    @Transactional
    public void deleteRefreshToken(String email) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        String refreshToken = valueOperations.get(email);

        redisTemplate.delete(refreshToken);
        redisTemplate.delete(email);
    }

    /*
    * Key로 Value 조회
    * */
    public String getRedisEmail(String refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        return valueOperations.get("[RefreshToken] : " + refreshToken);
    }

    public String getRedisRefreshToken(String email) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        String RefreshToken = valueOperations.get(email);

        return RefreshToken.replace("[RefreshToken] : ", "");
    }

}

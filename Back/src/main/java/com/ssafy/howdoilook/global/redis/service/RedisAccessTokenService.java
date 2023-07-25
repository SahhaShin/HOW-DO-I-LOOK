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
public class RedisAccessTokenService {

    private final RedisTemplate redisTemplate;

    /*
    * Key-Value 설정
    * */
    @Transactional
    public void setRedisAccessToken(String accessToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        valueOperations.set("[BlackList] : " + accessToken, "logout", Duration.ofMinutes(1440));
    }


}

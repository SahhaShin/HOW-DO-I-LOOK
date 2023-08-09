package com.ssafy.howdoilook.domain.soloChatroom.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import com.ssafy.howdoilook.global.handler.ImageException;
import com.ssafy.howdoilook.global.handler.SerializationException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import static org.springframework.data.mongodb.util.BsonUtils.toJson;

@Service
@RequiredArgsConstructor
public class SoloChatMQService {
    private final RedisTemplate<String, String> redisTemplate;
    private final SoloChatRoomService soloChatRoomService;
    private static final String QUEUE_KEY = "SoloChat";
    private final ObjectMapper objectMapper = new ObjectMapper();


    public void enqueue(ChatRecodRequestDto requestDto) {
        try {
            String chatContent = objectMapper.writeValueAsString(requestDto);
            redisTemplate.opsForList().leftPush(QUEUE_KEY, chatContent);
        } catch (JsonProcessingException e){
            throw new SerializationException("메세지큐에 넣는 과정에서 직렬화 이슈 발생",e);
        }
    }

    public ChatRecodRequestDto dequeue(){
        String chatContent = redisTemplate.opsForList().rightPop(QUEUE_KEY);
        if(chatContent != null){
            try{
                return objectMapper.readValue(chatContent, ChatRecodRequestDto.class);
            } catch (JsonProcessingException e){
                throw new SerializationException("메세지큐에서 빼는 과정에서 역직렬화 이슈 발생", e);
            }
        }
        return null;
    }

    @Scheduled(fixedRate = 100)
    public void processMessageQueue(){
        ChatRecodRequestDto chatMessage = dequeue();

        if(chatMessage != null){
            //알림에 추가하는 기능 추가

            //저장 로직 추가
            soloChatRoomService.recordChat(chatMessage);
        }
    }

}

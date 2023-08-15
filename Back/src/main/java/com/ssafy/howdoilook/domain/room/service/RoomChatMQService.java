package com.ssafy.howdoilook.domain.room.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.howdoilook.domain.room.dto.ImageChatDto;
import com.ssafy.howdoilook.domain.room.dto.response.WebSocket.RoomChatImageResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.WebSocket.RoomChatResponseDto;
import com.ssafy.howdoilook.domain.room.entity.ImageType;
import com.ssafy.howdoilook.domain.room.entity.RoomChat;
import com.ssafy.howdoilook.domain.room.entity.RoomChatImage;
import com.ssafy.howdoilook.domain.room.repository.ChatRepository.RoomChatImageRepository;
import com.ssafy.howdoilook.domain.room.repository.ChatRepository.RoomChatRepository;
import com.ssafy.howdoilook.global.handler.SerializationException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class RoomChatMQService {
    private final RedisTemplate<String,String> redisTemplate;
    private final RoomChatRepository roomChatRepository;
    private final RoomChatImageRepository roomChatImageRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String CHAT_QUEUE_KEY = "RoomChat";
    private static final String IMAGE_QUEUE_KEY = "RoomImage";

    public void chatEnqueue(RoomChatResponseDto responseDto){
        try{
            String chatContent = objectMapper.writeValueAsString(responseDto);
            redisTemplate.opsForList().leftPush(CHAT_QUEUE_KEY, chatContent);
        } catch (JsonProcessingException e){
            throw new SerializationException("채팅방 채팅 mq에 넣는 과정에서 에러 발생",e);
        }
    }

    public void imageEnqueue(RoomChatImageResponseDto responseDto){
        try{
            String chatContent = objectMapper.writeValueAsString(responseDto);
            redisTemplate.opsForList().leftPush(IMAGE_QUEUE_KEY, chatContent);
        } catch (JsonProcessingException e){
            throw new SerializationException("채팅방 이미지 mq에 넣는 과정에서 에러 발생",e);
        }
    }

    public RoomChatResponseDto chatDequeue() {
        String chatContent = redisTemplate.opsForList().rightPop(CHAT_QUEUE_KEY);
        if(chatContent != null){
            try {
                return objectMapper.readValue(chatContent, RoomChatResponseDto.class);
            } catch (JsonProcessingException e){
                throw new SerializationException("채팅방 채팅 mq에서 빼는 과정에서 에러 발생", e);
            }
        }
        return null;
    }

    public RoomChatImageResponseDto imageDequeue(){
        String chatContent = redisTemplate.opsForList().rightPop(IMAGE_QUEUE_KEY);
        if(chatContent != null){
            try{
                return objectMapper.readValue(chatContent, RoomChatImageResponseDto.class);
            } catch (JsonProcessingException e){
                throw new SerializationException("채팅방 이미지 mq에서 빼는 과정에서 에러 발생", e);
            }
        }
        return null;
    }

    @Scheduled(fixedRate = 1000)
    public void processRoomChatMessageQueue(){
        RoomChatResponseDto chatMessage = chatDequeue();

        if(chatMessage != null){
            //몽고db에 저장
            roomChatRepository.save(
                    RoomChat.builder()
                    .roomId(chatMessage.getRoomId())
                    .nickName(chatMessage.getNickName())
                    .time(LocalDateTime.parse(chatMessage.getTime()))
                    .content(chatMessage.getChatContent())
                    .build()
            );
        }
    }

    @Scheduled(fixedRate = 1000)
    public void processRoomImageMessageQueue(){
        RoomChatImageResponseDto chatMessage = imageDequeue();

        if(chatMessage != null){
            //몽고db에 저장
            for(ImageChatDto image : chatMessage.getImage()) {
                roomChatImageRepository.save(
                        RoomChatImage.builder()
                        .imageURL(image.getPhotoLink())
                        .time(LocalDateTime.parse(chatMessage.getTime()))
                        .nickName(chatMessage.getNickName())
                        .roomId(chatMessage.getRoomId())
                        .type(ImageType.valueOf(image.getType()))
                        .build()
                );
            }
        }
    }
}

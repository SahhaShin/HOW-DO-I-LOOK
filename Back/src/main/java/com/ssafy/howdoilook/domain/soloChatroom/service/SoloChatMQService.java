package com.ssafy.howdoilook.domain.soloChatroom.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.howdoilook.domain.alarm.dto.request.AlarmSaveRequestDto;
import com.ssafy.howdoilook.domain.alarm.entity.AlarmType;
import com.ssafy.howdoilook.domain.alarm.service.AlarmService;
import com.ssafy.howdoilook.domain.room.entity.RoomChat;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository.SoloChatRoomRepository;
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
    private final AlarmService alarmService;
    private final SoloChatRoomRepository soloChatRoomRepository;
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
            //채팅에 대한 알림 추가
            System.out.println(chatMessage.getRoomId());
            SoloChatRoom room = soloChatRoomRepository.findById(chatMessage.getRoomId())
                    .orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다"));

            long senderId = chatMessage.getUserId();
            long receiverId = (senderId == room.getUserA().getId()) ? room.getUserB().getId() : room.getUserA().getId();

            AlarmSaveRequestDto alarmDto = AlarmSaveRequestDto.builder()
                    .type(AlarmType.CHAT)
                    .alarmSenderId(chatMessage.getUserId())
                    .alarmreceiverId(receiverId)
                    .alarmSenderId(senderId)
                    .build();
            alarmService.saveAlarm(alarmDto);

            //채팅 로그 저장 로직
            soloChatRoomService.recordChat(chatMessage, room);
        }
    }

}

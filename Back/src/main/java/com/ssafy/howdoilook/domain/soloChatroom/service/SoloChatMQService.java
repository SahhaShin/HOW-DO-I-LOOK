package com.ssafy.howdoilook.domain.soloChatroom.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.howdoilook.domain.alarm.dto.request.AlarmSaveRequestDto;
import com.ssafy.howdoilook.domain.alarm.entity.AlarmType;
import com.ssafy.howdoilook.domain.alarm.service.AlarmService;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecordRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository.SoloChatRoomRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.handler.SerializationException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@EnableScheduling
public class SoloChatMQService {
    private final RedisTemplate<String, String> redisTemplate;
    private final SoloChatRoomService soloChatRoomService;
    private final AlarmService alarmService;
    private final UserRepository userRepository;
    private static final String QUEUE_KEY = "SoloChat";
    private final ObjectMapper objectMapper = new ObjectMapper();


    public void enqueue(ChatRecordRequestDto requestDto) {
        try {
            String chatContent = objectMapper.writeValueAsString(requestDto);
            redisTemplate.opsForList().leftPush(QUEUE_KEY, chatContent);
        } catch (JsonProcessingException e){
            throw new SerializationException("메세지큐에 넣는 과정에서 직렬화 이슈 발생",e);
        }
    }

    public ChatRecordRequestDto dequeue(){
        String chatContent = redisTemplate.opsForList().rightPop(QUEUE_KEY);
        if(chatContent != null){
            try{
                return objectMapper.readValue(chatContent, ChatRecordRequestDto.class);
            } catch (JsonProcessingException e){
                throw new SerializationException("메세지큐에서 빼는 과정에서 역직렬화 이슈 발생", e);
            }
        }
        return null;
    }

    @Scheduled(fixedRate = 1000)
    public void processMessageQueue(){
        ChatRecordRequestDto chatMessage = dequeue();

        if(chatMessage != null){
            //db에 pk값을 저장하기 위한 user 조회 ( jwt에 user pk를 저장하고 있다면 필요 없는 코드 )
            User user = userRepository.findByEmail(chatMessage.getSenderEmail())
                    .orElseThrow(() -> new IllegalArgumentException("해당 사용자는 존재하지 않습니다"));

            long senderId = user.getId();
            long receiverId = chatMessage.getUserId();

            AlarmSaveRequestDto alarmDto = AlarmSaveRequestDto.builder()
                    .type(AlarmType.CHAT)
                    .alarmSenderId(chatMessage.getUserId())
                    .alarmreceiverId(receiverId)
                    .alarmSenderId(senderId)
                    .build();
            alarmService.saveAlarm(alarmDto);

            //채팅 로그 저장 로직
            soloChatRoomService.recordChat(chatMessage);
        }
    }

}

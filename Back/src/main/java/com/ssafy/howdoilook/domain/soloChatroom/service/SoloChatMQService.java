package com.ssafy.howdoilook.domain.soloChatroom.service;

import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Service
@RequiredArgsConstructor
public class SoloChatMQService {
    private final BlockingQueue<ChatRecodRequestDto> messageQueue = new LinkedBlockingQueue<>();
//    private static final QUEUE_KEY_PREFIX = "SoloChat"
    public void enqueu(ChatRecodRequestDto requestDto){
        messageQueue.offer(requestDto);
    }


    private final SimpMessagingTemplate simpMessagingTemplate;

    @Scheduled(fixedRate = 1000)
    public void processMessageQueue(){
        ChatRecodRequestDto chatMessage = messageQueue.poll();
        if(chatMessage != null){
            //알림에 추가하는 기능 추가

            //저장 로직 추가

        }
    }

}

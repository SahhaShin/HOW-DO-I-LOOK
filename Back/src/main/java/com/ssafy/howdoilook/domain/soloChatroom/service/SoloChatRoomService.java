package com.ssafy.howdoilook.domain.soloChatroom.service;

import com.ssafy.howdoilook.domain.soloChatroom.dto.ChatDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatRoomDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatContextRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatContextListResponseDto;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChat;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository.SoloChatRoomRepository;
import com.ssafy.howdoilook.domain.soloChatroom.repository.soloChatRepository.SoloChatRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class SoloChatRoomService {

    private final SoloChatRepository soloChatRepository;
    private final UserRepository userRepository;
    private final SoloChatRoomRepository soloChatRoomRepository;

    //채팅 내용 저장 및 브로드캐스팅을 위한 반환
    @Transactional
    public ChatRecodRequestDto recordChat(ChatRecodRequestDto requestDto){
        String content = requestDto.getChatContent();

        SoloChatRoom room = soloChatRoomRepository.findById(requestDto.getRoomId());

        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        SoloChat solochat = SoloChat.builder()
                .content(content)
                .room(room)
                .user(user)
                .build();

        soloChatRepository.save(solochat);
        return requestDto;
    }

    //특정 유저가 진행했던 채팅방 리스트 반환
    @Transactional
    public List<ChatRoomDto> getUserChatRoom(Long userId){

        List<SoloChatRoom> chatRoomListPrev = soloChatRoomRepository.findByUserA(userId);
        List<ChatRoomDto> chatRoomListNext = new ArrayList<>();

        for (SoloChatRoom chatRoom : chatRoomListPrev){
            ChatRoomDto dto = ChatRoomDto.builder()
                    .id(chatRoom.getId())
                    .userAId(chatRoom.getUserA().getId())
                    .userBId(chatRoom.getUserB().getId())
                    .chatroomCode(chatRoom.getRoomCode())
                    .build();
            chatRoomListNext.add(dto);
        }
        System.out.println(chatRoomListNext.size());
        return chatRoomListNext;
    }
    //채팅방 입장
    @Transactional
    public ChatContextListResponseDto enterUser(ChatContextRequestDto requestDto){
        User userA = userRepository.findById(requestDto.getUserA())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        User userB = userRepository.findById(requestDto.getUserB())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        int isExist = soloChatRoomRepository.countByUserAAndUserB(userA, userB);
        //기존 채팅방이 없다면
        if(isExist == 0){
            String roomCode = UUID.randomUUID().toString();
            SoloChatRoom chatRoom1 = SoloChatRoom.builder()
                    .userA(userA)
                    .userB(userB)
                    .roomCode(roomCode)
                    .build();

            SoloChatRoom chatRoom2 = SoloChatRoom.builder()
                    .userA(userB)
                    .userB(userA)
                    .roomCode(roomCode)
                    .build();

            soloChatRoomRepository.save(chatRoom1);
            soloChatRoomRepository.save(chatRoom2);

            //채팅방을 처음 만들면 "건강한 채팅 문화를 만듭시다."는 메시지를 첫 메시지로 등록한다.
            ChatDto dto = ChatDto.builder()
                    .chatRoomId(chatRoom1.getId())
                    .content("건강한 채팅 문화를 만듭시다.")
                    .build();
            
            List<ChatDto> answer = new ArrayList<>();
            answer.add(dto);
            
            ChatContextListResponseDto responseDto = ChatContextListResponseDto.builder()
                    .chatContext(answer)
                    .chatRoomCode(roomCode)
                    .build();

            return responseDto;
        }
        //기존 채팅방이 있다면
        else{
            SoloChatRoom chatRoom = soloChatRoomRepository.findByUserAAndUserB(userA, userB);
            List<SoloChat> chatContext = soloChatRepository.findByRoomId(chatRoom.getId());

            List<ChatDto> answer = new ArrayList<>();

            for(SoloChat chat : chatContext){
                ChatDto dto = ChatDto.builder()
                        .chatRoomId(chat.getRoom().getId())
                        .chatId(chat.getId())
                        .userNickName(chat.getUser().getNickname())
                        .userProfile(chat.getUser().getProfileImg())
                        .createTime(chat.getCreatedDate())
                        .content(chat.getContent())
                        .build();
                answer.add(dto);
            }

            ChatContextListResponseDto responseDto = ChatContextListResponseDto.builder()
                    .chatContext(answer)
                    .chatRoomCode(chatRoom.getRoomCode())
                    .build();
            return responseDto;
        }



    }
}

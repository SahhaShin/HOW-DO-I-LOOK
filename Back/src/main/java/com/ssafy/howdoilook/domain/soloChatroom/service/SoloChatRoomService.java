package com.ssafy.howdoilook.domain.soloChatroom.service;

import com.ssafy.howdoilook.domain.soloChatroom.dto.ChatDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatRoomDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatContextRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecodRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatContextListResponseDto;
import com.ssafy.howdoilook.domain.soloChatroom.entity.Chat;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository.SoloChatRoomRepository;
import com.ssafy.howdoilook.domain.soloChatroom.repository.soloChatRepository.ChatRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class SoloChatRoomService {

    private final UserRepository userRepository;
    private final SoloChatRoomRepository soloChatRoomRepository;
    private final ChatRepository chatRepository;
    
    //채팅시 채팅 기록 MongoDB에 저장
    @Transactional
    public void recordChat(ChatRecodRequestDto requestDto){
        String content = requestDto.getChatContent();

        SoloChatRoom room = soloChatRoomRepository.findById(requestDto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다"));

        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        //채팅방이 짝수면 -1을 해준다. ( 채팅방은 2개씩 생성되고, 채팅은 홀수 채팅방을 기준으로 사용한다. )
        long roomId = room.getId();
        roomId = (roomId % 2 == 0) ? roomId-1 : roomId;

        Chat chat = Chat.builder()
                .roomId(roomId)
                .userId(user.getId())
                .content(content)
                .build();

        chatRepository.save(chat);
    }


    //특정 유저가 진행했던 채팅방 리스트 반환
    @Transactional
    public List<ChatRoomDto> getUserChatRoom(Long userId){

        List<SoloChatRoom> chatRoomListPrev = soloChatRoomRepository.findByUserA(userId);
        List<ChatRoomDto> chatRoomListNext = new ArrayList<>();

        //Entity To Dto
        for (SoloChatRoom chatRoom : chatRoomListPrev){
            ChatRoomDto dto = ChatRoomDto.builder()
                    .id(chatRoom.getId())
                    .userAId(chatRoom.getUserA().getId())
                    .userBId(chatRoom.getUserB().getId())
                    .chatroomCode(chatRoom.getRoomCode())
                    .build();
            chatRoomListNext.add(dto);
        }
        return chatRoomListNext;
    }

    //채팅방 입장 Mongodb
    @Transactional
    public ChatContextListResponseDto enterUser(ChatContextRequestDto requestDto){
        User userA = userRepository.findById(requestDto.getUserA())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        User userB = userRepository.findById(requestDto.getUserB())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        int isExist = soloChatRoomRepository.countByUserAAndUserB(userA, userB);
        //기존 채팅방이 없다면
        if(isExist == 0){
            //a-b, b-a 채팅방 2개 생성 ( 채팅방 검색을 위해 2개를 생성하지만 실제 pk값은 홀수 채팅방의 pk값만 사용한다. )
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

            ChatContextListResponseDto responseDto = ChatContextListResponseDto.builder()
                    .chatRoomCode(roomCode)
                    .build();

            return responseDto;
        }
        //기존 채팅방이 있다면
        else{
            SoloChatRoom chatRoom = soloChatRoomRepository.findByUserAAndUserB(userA, userB)
                                        .orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다"));

            //채팅방이 짝수면 -1을 해준다. ( 채팅방은 2개씩 생성되고, 채팅은 홀수 채팅방을 기준으로 사용한다. )
            Long roomId = chatRoom.getId();
            roomId = (roomId % 2 == 0) ? roomId - 1 : roomId;
            List<Chat> chatContext = chatRepository.findAllByRoomIdOrderByTimeAsc(roomId.toString());
            List<ChatDto> answer = new ArrayList<>();

            //Entity To Dto
            for(Chat chat : chatContext){
                User user = userRepository.findById(chat.getUserId())
                        .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

                ChatDto dto = ChatDto.builder()
                        .chatRoomId(Long.parseLong(chat.getRoomId()))
                        .userNickName(user.getNickname())
                        .userProfile(user.getProfileImg())
                        .time(chat.getTime())
                        .content(chat.getContent())
                        .build();
                answer.add(dto);
            }

            //make ResponseDto
            ChatContextListResponseDto responseDto = ChatContextListResponseDto.builder()
                    .chatContext(answer)
                    .chatRoomCode(chatRoom.getRoomCode())
                    .build();
            return responseDto;
        }
    }

//    //채팅방 입장   Mysql ( Mongodb로 마이그레이션 완료 )
//    @Transactional
//    public ChatContextListResponseDto enterUser(ChatContextRequestDto requestDto){
//        User userA = userRepository.findById(requestDto.getUserA())
//                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));
//
//        User userB = userRepository.findById(requestDto.getUserB())
//                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));
//
//        int isExist = soloChatRoomRepository.countByUserAAndUserB(userA, userB);
//        //기존 채팅방이 없다면
//        if(isExist == 0){
//            //a-b, b-a 채팅방 2개 생성
//            String roomCode = UUID.randomUUID().toString();
//            SoloChatRoom chatRoom1 = SoloChatRoom.builder()
//                    .userA(userA)
//                    .userB(userB)
//                    .roomCode(roomCode)
//                    .build();
//
//            SoloChatRoom chatRoom2 = SoloChatRoom.builder()
//                    .userA(userB)
//                    .userB(userA)
//                    .roomCode(roomCode)
//                    .build();
//
//            soloChatRoomRepository.save(chatRoom1);
//            soloChatRoomRepository.save(chatRoom2);
//
//            ChatContextListResponseDto responseDto = ChatContextListResponseDto.builder()
//                    .chatRoomCode(roomCode)
//                    .build();
//
//            return responseDto;
//        }
//        //기존 채팅방이 있다면
//        else{
//            SoloChatRoom chatRoom = soloChatRoomRepository.findByUserAAndUserB(userA, userB)
//                                        .orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다"));
//
//            List<SoloChat> chatContext = soloChatRepository.findByRoomId(chatRoom.getId());
//            List<ChatDto> answer = new ArrayList<>();
//
//            //Entity To Dto
//            for(SoloChat chat : chatContext){
//                ChatDto dto = ChatDto.builder()
//                        .chatRoomId(chat.getRoom().getId())
//                        .chatId(chat.getId())
//                        .userNickName(chat.getUser().getNickname())
//                        .userProfile(chat.getUser().getProfileImg())
//                        .createTime(chat.getCreatedDate())
//                        .content(chat.getContent())
//                        .build();
//                answer.add(dto);
//            }
//
//            //make ResponseDto
//            ChatContextListResponseDto responseDto = ChatContextListResponseDto.builder()
//                    .chatContext(answer)
//                    .chatRoomCode(chatRoom.getRoomCode())
//                    .build();
//            return responseDto;
//        }
//    }

    //
//    //채팅 내용 저장 및 브로드캐스팅을 위한 반환  Mysql ( Mongodb로 마이그레이션 완료 )
//    @Transactional
//    public void recordChat(ChatRecodRequestDto requestDto){
//        String content = requestDto.getChatContent();
//
//        SoloChatRoom room = soloChatRoomRepository.findById(requestDto.getRoomId())
//                .orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다"));
//
//        User user = userRepository.findById(requestDto.getUserId())
//                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));
//
//        SoloChat solochat = SoloChat.builder()
//                .content(content)
//                .room(room)
//                .user(user)
//                .build();
//
//        soloChatRepository.save(solochat);
//    }
}

package com.ssafy.howdoilook.domain.soloChatroom.service;

import com.ssafy.howdoilook.domain.soloChatroom.dto.ChatDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatClickRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatClickResponseDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatRoomDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatContextRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.request.ChatRecordRequestDto;
import com.ssafy.howdoilook.domain.soloChatroom.dto.response.ChatContextListResponseDto;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChat;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository.SoloChatRoomRepository;
import com.ssafy.howdoilook.domain.soloChatroom.repository.soloChatRepository.ChatRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
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

    private final int PAGESIZE = 30;


    //채팅 정보에 대한 인가처리
    @Transactional
    public void authorizeChat(ChatRecordRequestDto requestDto){
        SoloChatRoom chatroom = soloChatRoomRepository.findById(requestDto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("해당 채팅방이 존재하지 않습니다"));
    }

    //클릭시 최근 읽은 채팅 시간 저장
    @Transactional
    public ChatClickResponseDto clickEvent(ChatClickRequestDto requestDto){
        LocalDateTime localDateTime = LocalDateTime.now();
        soloChatRoomRepository.UpdateChatDate(requestDto.getRoomId(),localDateTime);
        return ChatClickResponseDto.builder()
                .readtime(localDateTime.toString())
                .userId(requestDto.getUserId())
                .build();
    }

    //채팅시 채팅 기록 MongoDB에 저장
    @Transactional
    public void recordChat(ChatRecordRequestDto requestDto){
        String content = requestDto.getChatContent();

        User user = userRepository.findById(requestDto.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        long roomId = requestDto.getRoomId();

        SoloChat chat = SoloChat.builder()
                .roomId(roomId)
                .userId(user.getId())
                .content(content)
                .build();

        soloChatRoomRepository.UpdateChatDate(roomId, LocalDateTime.now());
        chatRepository.save(chat);
    }



    //특정 유저가 진행했던 채팅방 리스트 반환
    @Transactional
    public List<ChatRoomDto> getUserChatRoomList(UserDetails userDetails){
        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));


        List<SoloChatRoom> chatRoomListPrev = soloChatRoomRepository.findByUser(user.getId());
        List<ChatRoomDto> chatRoomListNext = new ArrayList<>();

        //Entity To Dto
        for (SoloChatRoom chatRoom : chatRoomListPrev){
            SoloChat lastChat = chatRepository.findTopByRoomIdOrderByTimeDesc(chatRoom.getId());
            ChatRoomDto dto = ChatRoomDto.builder()
                    .id(chatRoom.getId())
                    .userAId(user.getId())
                    .userBId((chatRoom.getUserA().getId() == user.getId()) ? chatRoom.getUserB().getId() : chatRoom.getUserA().getId())
                    .chatroomCode(chatRoom.getRoomCode())
                    .anotherNickName((chatRoom.getUserA().getId() == user.getId()) ? chatRoom.getUserB().getNickname() : chatRoom.getUserA().getNickname())
                    .lastChat((lastChat == null) ? "대화내용이 없습니다.":lastChat.getContent())
                    .lastChatTime((lastChat == null) ? "":lastChat.getTime().toString())
                    .userAProfileImg(chatRoom.getUserA().getProfileImg())
                    .userBProfileImg(chatRoom.getUserB().getProfileImg())
                    .userAGender(chatRoom.getUserA().getGender())
                    .userBGender(chatRoom.getUserB().getGender())
                    .build();
            chatRoomListNext.add(dto);
        }
        return chatRoomListNext;
    }


    //채팅방 입장 Mongodb ( 채팅 내용 반환 )
    @Transactional
    public ChatContextListResponseDto getChatContextList(ChatContextRequestDto requestDto, UserDetails userDetails){
        User userA = userRepository.findById(requestDto.getUserA())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        User userB = userRepository.findById(requestDto.getUserB())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        User user = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        if(userA.getId() != user.getId() && userB.getId() != user.getId()){
            new IllegalArgumentException("본인이 아닙니다.");
        }

        int isExist = soloChatRoomRepository.countByUserAAndUserB(userA, userB)
                + soloChatRoomRepository.countByUserAAndUserB(userB, userA);
        //기존 채팅방이 없다면
        if(isExist == 0){
            String roomCode = UUID.randomUUID().toString();
            SoloChatRoom chatRoom = SoloChatRoom.builder()
                    .userA(userA)
                    .userB(userB)
                    .roomCode(roomCode)
                    .build();
            soloChatRoomRepository.save(chatRoom);

            ChatContextListResponseDto responseDto = ChatContextListResponseDto.builder()
                    .chatRoomCode(roomCode)
                    .chatRoomId(chatRoom.getId())
                    .build();
            return responseDto;
        }
        //기존 채팅방이 있다면
        else{
            SoloChatRoom chatRoom = soloChatRoomRepository.findByUserAAndUserB(userA, userB)
                    .orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다"));

            Long roomId = chatRoom.getId();

            //최근 채팅 리스트 반환
            return getNextPageChat(chatRoom.getId(), 0);
        }
    }
    @Transactional
    public ChatContextListResponseDto getNextPageChat(long roomId, int page){
        SoloChatRoom chatRoom = soloChatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("해당 채팅방은 존재하지 않습니다"));

        Pageable pageable = PageRequest.of(page,PAGESIZE);
        List<SoloChat> chatContext = chatRepository.findAllByRoomIdOrderByTimeAsc(roomId, pageable);
        List<ChatDto> answer = new ArrayList<>();

        //Entity To Dto
        for(SoloChat chat : chatContext){
            User user = userRepository.findById(chat.getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

            ChatDto dto = ChatDto.builder()
                    .chatRoomId(chat.getRoomId())
                    .userNickName(user.getNickname())
                    .userProfile(user.getProfileImg())
                    .time(chat.getTime().toString())
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

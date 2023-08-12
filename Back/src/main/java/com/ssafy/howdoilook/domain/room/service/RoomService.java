package com.ssafy.howdoilook.domain.room.service;

import com.ssafy.howdoilook.domain.clothes.repository.ClothesRepository;
import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import com.ssafy.howdoilook.domain.feedPhoto.repository.FeedPhotoRepository;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.room.dto.ImageChatDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomAddRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomChatImageRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomChatRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatImageResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomChatResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomDetailResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.entity.*;
import com.ssafy.howdoilook.domain.room.repository.ChatRepository.RoomChatImageRepository;
import com.ssafy.howdoilook.domain.room.repository.ChatRepository.RoomChatRepository;
import com.ssafy.howdoilook.domain.room.repository.RoomRepository.RoomRepository;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUser;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUserType;
import com.ssafy.howdoilook.domain.roomUser.repository.RoomUserRepository;

import com.ssafy.howdoilook.domain.roomUser.service.RoomUserService;

import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.handler.ImageException;
import com.ssafy.howdoilook.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.expression.AccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final RoomUserRepository roomUserRepository;
    private final RoomChatRepository roomChatRepository;
    private final RoomChatImageRepository roomChatImageRepository;
    private final FeedPhotoRepository feedPhotoRepository;
    private final ClothesRepository clothesRepository;

    private final JwtService jwtService;
    private final RoomUserService roomUserService;

    @Transactional
    public RoomChatImageResponseDto imageIntegrity(RoomChatImageRequestDto requestDto){
        LocalDateTime time = LocalDateTime.now();

        //닉네임 무결성 검증
        String email = jwtService.extractEmail(requestDto.getToken()).get();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        //이미지 링크 무결성 검증
        for(ImageChatDto image : requestDto.getImage()) {
            //링크 무결성 검증
            if (image.getType() == "FEED") {
                if (!feedPhotoRepository.existsByLink(image.getPhotoLink())) {
                    throw new ImageException("스트리밍 채팅 잘못된 이미지 링크 제공");
                }
            } else if(image.getType() == "CLOTHES") {
                if (!clothesRepository.existsByPhotoLink(image.getPhotoLink())){
                    throw new ImageException("스트리밍 채팅 잘못된 이미지 링크 제공");
                }
            }
        }

        return RoomChatImageResponseDto.builder()
                .roomId(requestDto.getRoomId())
                .time(time.toString())
                .nickName(user.getNickname())
                .badge(user.getShowBadgeType().toString())
                .image(requestDto.getImage())
                .build();
    }
    @Transactional
    public RoomChatResponseDto chatIntegrity(RoomChatRequestDto requestDto){
        LocalDateTime time = LocalDateTime.now();
        //닉네임 무결성 검증
        String email = jwtService.extractEmail(requestDto.getToken()).get();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        return RoomChatResponseDto.builder()
                .roomId(requestDto.getRoomId())
                .time(time.toString())
                .chatContent(requestDto.getChatContent())
                .nickName(user.getNickname())
                .badge(user.getShowBadgeType().toString())
                .build();
    }

    @Transactional
    public Long addRoom(RoomAddRequestDto roomAddRequestDto, UserDetails userDetails) throws AccessException {
        String clientEmail = userDetails.getUsername();

        User user = userRepository.findById(roomAddRequestDto.getHostId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        Room room = Room.builder()
                .code(roomAddRequestDto.getCode())
                .title(roomAddRequestDto.getTitle())
                .type(RoomType.valueOf(roomAddRequestDto.getType()))
                .host(user)
                .minAge(roomAddRequestDto.getMinAge())
                .maxAge(roomAddRequestDto.getMaxAge())
                .gender(Gender.valueOf(roomAddRequestDto.getGender()))
                .chatCode(UUID.randomUUID().toString())
                .build();

        Room saveRoom = roomRepository.save(room);

        roomUserService.addRoomUser(saveRoom.getHost().getId(), saveRoom.getId(), userDetails);

        return room.getId();
    }

    @Transactional
    public Long updateRoom(Long roomId, RoomUpdateRequestDto roomUpdateRequestDto, UserDetails userDetails) throws AccessException {

        Room findRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 방이 존재하지 않습니다.", 1));

        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(findRoom.getHost().getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        return findRoom.update(roomUpdateRequestDto);
    }

    public List<RoomListResponseDto> getAllRoomList(String type, int page, String search) {

        List<RoomListResponseDto> allRoomResponseDtoList = new ArrayList<>();
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageRequest = PageRequest.of(page, 5, sort);

        /**
         * 모든 방 찾을 때
         */
        if(type == null && search == null) {
            Page<Room> allRooms = roomRepository.findAll(pageRequest);

            for(Room room : allRooms) {
                allRoomResponseDtoList.add(new RoomListResponseDto(room));
            }

            return allRoomResponseDtoList;
        }

        /**
         * 타입만 설정되어 있을 때
         */
        if(type != null && search == null) {
            RoomType roomType = RoomType.valueOf(type);
            Page<Room> getRoomList = roomRepository.findByType(roomType, pageRequest);

            for(Room room : getRoomList) {
                allRoomResponseDtoList.add(new RoomListResponseDto(room));
            }

            return allRoomResponseDtoList;
        }

        /**
         * 검색어만 입력이 있을 때
         */
        if(type == null && search != null) {
            Page<Room> getRoomList = roomRepository.findByTitleContaining(search, pageRequest);

            for(Room room : getRoomList) {
                allRoomResponseDtoList.add(new RoomListResponseDto(room));
            }

            return allRoomResponseDtoList;
        }

        /**
         * 타입도 설정되어 있고 검색어도 입력이 들어와 있을 때
         */
        if(type != null && search != null) {
            Page<Room> getRoomList = roomRepository.findByTypeAndTitleContaining(RoomType.valueOf(type), search, pageRequest);

            for(Room room : getRoomList) {
                allRoomResponseDtoList.add(new RoomListResponseDto(room));
            }

            return allRoomResponseDtoList;
        }

        return allRoomResponseDtoList;

    }

    public List<RoomListResponseDto> getFollowingRoomList(String type, int page, Long userId, String search, UserDetails userDetails) throws AccessException {

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageRequest = PageRequest.of(page, 5, sort);

        User user = userRepository.findById(userId).orElseThrow(
                ()->new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다.", 1));

        String clientEmail = userDetails.getUsername();

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        // 유저가 팔로잉 하고있는 팔로잉 유저 리스트
        List<Follow> followingList = user.getFollowerList();

        List<RoomListResponseDto> getRoomList = roomRepository.findFollowingRoomList(followingList, type, search, pageRequest);

        return getRoomList;
    }

    public RoomDetailResponseDto getRoomDetail(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("해당 방이 존재하지 않습니다."));

        User user = userRepository.findById(room.getHost().getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        RoomDetailResponseDto roomDetailResponseDto = RoomDetailResponseDto.builder()
                .title(room.getTitle())
                .hostAge(user.getAge())
                .hostGender(String.valueOf(user.getGender()))
                .roomMinAge(room.getMinAge())
                .roomMaxAge(room.getMaxAge())
                .roomGender(String.valueOf(room.getGender()))
                .build();

        return roomDetailResponseDto;
    }

    @Transactional
    public void endRoom(Long roomId, UserDetails userDetails) throws AccessException {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("해당 방이 존재하지 않습니다."));

        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(room.getHost().getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        room.setEndedDate(LocalDateTime.now());
        List<RoomUser> roomUsers = roomUserRepository.findByRoom_Id(roomId);

        for(RoomUser roomUser : roomUsers) {
            roomUser.updateStatus(RoomUserType.valueOf("EXIT"));
        }
    }
}

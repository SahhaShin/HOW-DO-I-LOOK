package com.ssafy.howdoilook.domain.room.service;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.room.dto.request.RoomAddRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomDetailResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.RoomListResponseDto;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import com.ssafy.howdoilook.domain.room.repository.RoomRepository;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Transactional
    public Long addRoom(RoomAddRequestDto roomAddRequestDto) {
        User user = userRepository.findById(roomAddRequestDto.getHostId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        Room room = Room.builder()
                .code(roomAddRequestDto.getCode())
                .title(roomAddRequestDto.getTitle())
                .type(RoomType.valueOf(roomAddRequestDto.getType()))
                .host(user)
                .minAge(roomAddRequestDto.getMinAge())
                .maxAge(roomAddRequestDto.getMaxAge())
                .gender(Gender.valueOf(roomAddRequestDto.getGender()))
                .chatCode(roomAddRequestDto.getChatCode())
                .build();

        roomRepository.save(room);

        return room.getId();
    }

    @Transactional
    public Long updateRoom(Long roomId, RoomUpdateRequestDto roomUpdateRequestDto) {

        Room findRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("해당 방이 존재하지 않습니다."));

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

    public List<RoomListResponseDto> getFollowingRoomList(String type, int page, Long userId, String search) {

        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageRequest = PageRequest.of(page, 5, sort);

        User user = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("해당 유저가 존재하지 않습니다."));
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
}

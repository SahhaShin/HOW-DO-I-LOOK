package com.ssafy.howdoilook.domain.room.service;

import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.repository.FollowReposiroty;
import com.ssafy.howdoilook.domain.room.dto.request.RoomAddRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.AllRoomResponseDto;
import com.ssafy.howdoilook.domain.room.dto.response.FollowingRoomResponseDto;
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
    private final FollowReposiroty followReposiroty;

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

    public List<AllRoomResponseDto> getAllRoomList(String type, int page) {

        List<AllRoomResponseDto> allRoomResponseDtoList = new ArrayList<>();
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageRequest = PageRequest.of(page, 5, sort);

        if(type == null) {
            Page<Room> allRooms = roomRepository.findAll(pageRequest);

            for(Room room : allRooms) {
                allRoomResponseDtoList.add(new AllRoomResponseDto(room));
            }

            return allRoomResponseDtoList;
        }

        RoomType roomType = RoomType.valueOf(type);
        Page<Room> getRoomList = roomRepository.findByType(roomType, pageRequest);

        for(Room room : getRoomList) {
            allRoomResponseDtoList.add(new AllRoomResponseDto(room));
        }

        return allRoomResponseDtoList;
    }

    public Page<FollowingRoomResponseDto> getFollowingRoomList(String type, int page, Long userId) {

        List<FollowingRoomResponseDto> followingRoomResponseDtoList = new ArrayList<>();
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        PageRequest pageRequest = PageRequest.of(page, 5, sort);

        User user = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("해당 유저가 존재하지 않습니다."));
        // 유저가 팔로잉 하고있는 팔로잉 유저 리스트
        List<Follow> followingList = user.getFollowerList();

        if(type == null) {
            Page<FollowingRoomResponseDto> getRoomList = roomRepository.findByFollowingList(followingList, pageRequest);

            return getRoomList;
        }

        Page<FollowingRoomResponseDto> getRoomList = roomRepository.findByHost_IdAndType(followingList, RoomType.valueOf(type), pageRequest);

        return getRoomList;
    }
}

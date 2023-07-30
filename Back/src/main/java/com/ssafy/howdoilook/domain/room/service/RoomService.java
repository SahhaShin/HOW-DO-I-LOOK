package com.ssafy.howdoilook.domain.room.service;

import com.ssafy.howdoilook.domain.clothes.dto.request.ClothesUpdateDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomAddRequestDto;
import com.ssafy.howdoilook.domain.room.dto.request.RoomUpdateRequestDto;
import com.ssafy.howdoilook.domain.room.dto.response.AllRoomListResponseDto;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import com.ssafy.howdoilook.domain.room.repository.RoomRepository;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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

    public List<AllRoomListResponseDto> getAllRoomList(String type, int page) {

        List<AllRoomListResponseDto> allRoomListResponseDtoList = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(page, 5);

        if(type == null) {
            List<Room> allRooms = roomRepository.findAll();

            for(Room room : allRooms) {
                allRoomListResponseDtoList.add(new AllRoomListResponseDto(room));
            }

            return allRoomListResponseDtoList;
        }

        RoomType roomType = RoomType.valueOf(type);
        Page<Room> getRoomList = roomRepository.findByType(roomType, pageRequest);

        for(Room room : getRoomList) {
            allRoomListResponseDtoList.add(new AllRoomListResponseDto(room));
        }

        return allRoomListResponseDtoList;
    }
}

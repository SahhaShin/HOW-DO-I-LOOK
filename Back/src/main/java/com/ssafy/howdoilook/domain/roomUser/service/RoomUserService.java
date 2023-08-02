package com.ssafy.howdoilook.domain.roomUser.service;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.repository.RoomRepository;
import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserAddRequestDto;
import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserUpdateRequestDto;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUser;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUserType;
import com.ssafy.howdoilook.domain.roomUser.repository.RoomUserRepository;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomUserService {

    private final RoomUserRepository roomUserRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public Long addRoomUser(RoomUserAddRequestDto roomUserAddRequest) {
        User user = userRepository.findById(roomUserAddRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        Room room = roomRepository.findById(roomUserAddRequest.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("해당 방이 존재하지 않습니다."));

        if((room.getMinAge() > user.getAge()) || (room.getMaxAge() <= user.getAge())) {
            return -1L; // 나이 제한에 걸림
        }

        if((room.getGender() != Gender.X) && !(room.getGender().equals(user.getGender()))) {
            return -2L; // 성별 제한에 걸림
        }

        RoomUser findRoomUser = roomUserRepository.findByRoom_IdAndUser_Id(room.getId(), user.getId())
                .orElseThrow(() -> new IllegalArgumentException("해당 방의 참여자가 존재하지 않습니다."));

        if(findRoomUser != null) {

            // 이미 참여중이거나 나갔다가 다시 들어올 경우
            findRoomUser.updateStatus(RoomUserType.valueOf("JOIN"));

            return -3L;
        }

        RoomUser roomUser = RoomUser.builder()
                        .user(user).room(room).status(RoomUserType.valueOf("JOIN")).build();

        roomUserRepository.save(roomUser);

        return roomUser.getId();
    }

    @Transactional
    public Long updateRoomUser(RoomUserUpdateRequestDto roomUserUpdateRequest) {
        RoomUser findRoomUser = roomUserRepository.findByRoom_IdAndUser_Id(roomUserUpdateRequest.getRoomId(), roomUserUpdateRequest.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("해당 방의 참여자가 존재하지 않습니다."));

        // 참가 중이거나 이미 나간 상태인 경우
        return findRoomUser.updateStatus(RoomUserType.valueOf("EXIT"));
    }
}

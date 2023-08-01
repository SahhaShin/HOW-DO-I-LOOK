package com.ssafy.howdoilook.domain.roomUser.service;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.repository.RoomRepository;
import com.ssafy.howdoilook.domain.roomUser.dto.request.RoomUserAddRequest;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUser;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUserType;
import com.ssafy.howdoilook.domain.roomUser.repository.RoomUserRepository;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomUserService {

    private final RoomUserRepository roomUserRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    @Transactional
    public Long addRoomUser(RoomUserAddRequest roomUserAddRequest) {
        User user = userRepository.findById(roomUserAddRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        Room room = roomRepository.findById(roomUserAddRequest.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("해당 방이 존재하지 않습니다."));

        if((room.getMinAge() > user.getAge()) || (room.getMaxAge() <= user.getAge())) {
            return -1L; // 나이 제한에 걸림
        }

        System.out.println(room.getGender());

        if((room.getGender() != Gender.X) && !(room.getGender().equals(user.getGender()))) {
            return -2L; // 성별 제한에 걸림
        }

        if(!roomUserRepository.findByRoom_IdAndUser_Id(room.getId(), user.getId()).isEmpty()) {
            return -3L; // 이미 입장 중
        }

        RoomUser roomUser = RoomUser.builder()
                        .user(user).room(room).status(RoomUserType.valueOf("JOIN")).build();

        roomUserRepository.save(roomUser);

        return roomUser.getId();
    }
}

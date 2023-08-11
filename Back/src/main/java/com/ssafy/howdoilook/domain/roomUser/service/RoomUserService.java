package com.ssafy.howdoilook.domain.roomUser.service;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.roomUser.dto.response.RoomUserAddResponseDto;
import com.ssafy.howdoilook.domain.room.repository.RoomRepository.RoomRepository;
import com.ssafy.howdoilook.domain.roomUser.dto.response.RoomUserGetListDto;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUser;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUserType;
import com.ssafy.howdoilook.domain.roomUser.repository.RoomUserRepository;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.authorization.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.expression.AccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RoomUserService {

    private final RoomUserRepository roomUserRepository;
    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final AuthorizationService authorizationService;

    @Transactional
    public RoomUserAddResponseDto addRoomUser(Long userId, Long roomId, UserDetails userDetails) throws AccessException {

        User user = authorizationService.auth(userId, userDetails);

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 방이 존재하지 않습니다.", 1));

        if((room.getMinAge() > user.getAge()) || (room.getMaxAge() <= user.getAge())) {
            throw new AccessException("나이 제한에 맞지 않습니다.");
        }

        if((room.getGender() != Gender.X) && !(room.getGender().equals(user.getGender()))) {
            throw new AccessException("성별 제한에 맞지 않습니다.");
        }

        Optional<RoomUser> findRoomUser = roomUserRepository.findByRoom_IdAndUser_Id(room.getId(), user.getId());

        if(findRoomUser.isPresent()) {
             if(findRoomUser.get().getStatus() == RoomUserType.KICK) {
                 throw new AccessException("강퇴 당한 방은 들어올 수 없습니다.");
             }
            if((findRoomUser.get().getStatus() == RoomUserType.JOIN) || (findRoomUser.get().getStatus() == RoomUserType.EXIT)) {
                // 이미 참여중이거나 나갔다가 다시 들어올 경우
                findRoomUser.get().updateStatus(RoomUserType.JOIN);

                RoomUserAddResponseDto roomUserAddResponseDto = RoomUserAddResponseDto.builder()
                        .roomCode(room.getCode())
                        .chatCode(room.getChatCode())
                        .build();

                return roomUserAddResponseDto;
            }
        }

        RoomUser roomUser = RoomUser.builder()
                        .user(user).room(room).status(RoomUserType.valueOf("JOIN")).build();

        roomUserRepository.save(roomUser);

        RoomUserAddResponseDto roomUserAddResponseDto = RoomUserAddResponseDto.builder()
                .roomCode(room.getCode())
                .chatCode(room.getChatCode())
                .build();

        return roomUserAddResponseDto;
    }

    @Transactional
    public void updateRoomUser(Long userId, Long roomId, UserDetails userDetails) throws AccessException {

        authorizationService.auth(userId, userDetails);

        RoomUser findRoomUser = roomUserRepository.findByRoom_IdAndUser_Id(roomId, userId)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 방의 참여자가 존재하지 않습니다.", 1));

        // 참가 중이거나 이미 나간 상태인 경우
        findRoomUser.updateStatus(RoomUserType.EXIT);
    }

    @Transactional
    public void kickRoomUser(Long userId, Long roomId) {
        RoomUser findRoomUser = roomUserRepository.findByRoom_IdAndUser_Id(roomId, userId)
                .orElseThrow(() -> new IllegalArgumentException("해당 방의 참여자가 존재하지 않습니다."));

        findRoomUser.updateStatus(RoomUserType.KICK);
    }

    public List<RoomUserGetListDto> getRoomUserList(Long roomId, Long userId, UserDetails userDetails) throws AccessException {

        authorizationService.auth(userId, userDetails);

        Room findRoom = roomRepository.findById(roomId).orElseThrow(()->new EmptyResultDataAccessException("해당 방은 존재하지 않습니다.", 1));

        if(findRoom.getHost().getId() != userId) {
            RoomUser findRoomUser = roomUserRepository.findByRoom_IdAndUser_Id(roomId, userId)
                    .orElseThrow(() -> new EmptyResultDataAccessException("해당 방의 참여자가 아닙니다.", 1));
        }

        List<RoomUser> findRoomUsers = roomUserRepository.findByRoom_IdAndStatus(roomId, RoomUserType.JOIN);

        List<RoomUserGetListDto> roomUserGetListDtos = new ArrayList<>();

        for(RoomUser roomUser : findRoomUsers) {
            Optional<User> user = userRepository.findById(roomUser.getUser().getId());

            RoomUserGetListDto roomUserGetListDto = RoomUserGetListDto.builder()
                    .userId(user.get().getId())
                    .userNickname(user.get().getNickname())
                    .userProfileImg(user.get().getProfileImg())
                    .build();

            roomUserGetListDtos.add(roomUserGetListDto);
        }

        return roomUserGetListDtos;
    }
}

package com.ssafy.howdoilook.domain.userLike.service;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.repository.RoomRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.domain.userLike.dto.request.ScoreSaveRequestDto;
import com.ssafy.howdoilook.domain.userLike.entity.UserLike;
import com.ssafy.howdoilook.domain.userLike.entity.UserLikeType;
import com.ssafy.howdoilook.domain.userLike.repository.UserLikeRepository;
import com.ssafy.howdoilook.global.redis.service.RedisRankingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserLikeService {

    private final UserLikeRepository userLikeRepository;

    private final UserRepository userRepository;

    private final RoomRepository roomRepository;

    private final RedisRankingService redisRankingService;

    @Transactional
    public Long saveScore(ScoreSaveRequestDto scoreSaveRequestDto) {
        User user = userRepository.findById(scoreSaveRequestDto.getTargetUserId())
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다"));

        Room room = roomRepository.findById(scoreSaveRequestDto.getRoomId())
                .orElseThrow(() -> new IllegalArgumentException("해당 방이 존재하지 않습니다"));

        List<UserLike> findUserLike = userLikeRepository.findByTargetUser_IdAndRoom_Id(scoreSaveRequestDto.getTargetUserId(), scoreSaveRequestDto.getRoomId());

        if(!findUserLike.isEmpty()) {
            return -1L; // 이미 점수를 매김
        }

        UserLike userLike = UserLike.builder()
                .targetUser(user)
                .room(room)
                .type(UserLikeType.valueOf(scoreSaveRequestDto.getType()))
                .score(scoreSaveRequestDto.getScore())
                .build();

        userLikeRepository.save(userLike);

        redisRankingService.updateScore(scoreSaveRequestDto.getType(), user.getId(), scoreSaveRequestDto.getScore());

        return userLike.getId();
    }
}

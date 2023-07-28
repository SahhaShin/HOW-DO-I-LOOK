package com.ssafy.howdoilook.domain.follow.service;

import com.ssafy.howdoilook.domain.follow.dto.request.FollowDeleteRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.request.FollowSaveRequestDto;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.repository.FollowReposiroty;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {
    private final FollowReposiroty followReposiroty;
    private final UserRepository userRepository;

    @Transactional
    public Long saveFollow(FollowSaveRequestDto followSaveRequestDto){
        User follower = userRepository.findById(followSaveRequestDto.getFollowerId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 follower입니다."));
        User followee = userRepository.findById(followSaveRequestDto.getFolloweeId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 followee입니다."));

        Follow follow = Follow.builder()
                .follower(follower)
                .followee(followee)
                .build();
        followReposiroty.save(follow);
        return follow.getId();
    }

    @Transactional
    public void deleteFollow(FollowDeleteRequestDto followDeleteRequestDto){
        Follow findFollow = followReposiroty.findFollowIdByFollowerAndFollowee(
                followDeleteRequestDto.getFollowerId(), followDeleteRequestDto.getFolloweeId());
        followReposiroty.deleteById(findFollow.getId());
    }

}

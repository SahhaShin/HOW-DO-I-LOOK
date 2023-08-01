package com.ssafy.howdoilook.domain.follow.service;

import com.ssafy.howdoilook.domain.follow.dto.request.FollowDeleteRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.request.FollowSaveRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.response.FolloweeResponseDto;
import com.ssafy.howdoilook.domain.follow.dto.response.FollowerResponseDto;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.repository.FollowReposiroty;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {
    private final FollowReposiroty followReposiroty;
    private final UserRepository userRepository;

    //데이터가 중복으로 삽입되는거 ifelse로 처리했는데 예외로 처리하면 더 좋을거 같다.
    @Transactional
    public Long saveFollow(FollowSaveRequestDto followSaveRequestDto){
        User follower = userRepository.findById(followSaveRequestDto.getFollowerId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 follower입니다."));
        User followee = userRepository.findById(followSaveRequestDto.getFolloweeId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 followee입니다."));
        //넘어온 팔로우,팔로워 값으로 이미 데이터가 있는지 확인하는 작업
        //null값이 아니면 이미 데이터가 있는 것이다.
        Follow findFollow = followReposiroty.findFollowIdByFollowerAndFollowee(follower.getId(), followee.getId());
        //데이터가 없을때(정상일때)
        if (findFollow == null) {
            Follow follow = Follow.builder()
                    .follower(follower)
                    .followee(followee)
                    .build();
            followReposiroty.save(follow);
            return follow.getId();
        } else {
            return findFollow.getId();
        }


    }
    //데이터가 없는데 삭제하려는 것 구현 안함
    //구현하면 좋을 것 같다.
    @Transactional
    public void deleteFollow(FollowDeleteRequestDto followDeleteRequestDto){
        Follow findFollow = followReposiroty.findFollowIdByFollowerAndFollowee(
                followDeleteRequestDto.getFollowerId(), followDeleteRequestDto.getFolloweeId());
        followReposiroty.deleteById(findFollow.getId());
    }
    //내가 팔로우 하는 사람 리스트 반환
    public Page<FolloweeResponseDto> selectFolloweeList(Long userId,Pageable page){
        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("존재하지 않는 User 입니다."));

        Page<Follow> followeeByUserId = followReposiroty.findFolloweeByUserId(userId, page);
        List<Follow> content = followeeByUserId.getContent();

        List<FolloweeResponseDto> list = new ArrayList<>();

        //dto 객체 만들어서 리스트로 반환
        for (Follow follow : content) {
            //user가 팔로우하는 대상
            User followee = follow.getFollowee();
            list.add(FolloweeResponseDto.builder()
                    .id(followee.getId())
                    .email(followee.getEmail())
                    .name(followee.getName())
                    .nickname((followee.getNickname()))
                    .build()
            );
        }
        return new PageImpl<>(list, followeeByUserId.getPageable(), followeeByUserId.getTotalElements());
    }
    //나를 팔로워 하는사람
    public Page<FollowerResponseDto> selectFollowerList(Long userId, Pageable page){

        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("존재하지 않는 User 입니다."));

        Page<Follow> followerByUserId = followReposiroty.findFollowerByUserId(userId, page);
        List<Follow> content = followerByUserId.getContent();

        //반환할 dto리스트 선언
        List<FollowerResponseDto> list = new ArrayList<>();

        //dto 객체 만들어서 리스트로 반환
        for (Follow follow : content) {
            User follower = follow.getFollower();
            FollowerResponseDto followerResponseDto = FollowerResponseDto.builder()
                    .id(follower.getId())
                    .email(follower.getEmail())
                    .name(follower.getName())
                    .nickname(follower.getNickname())
                    .build();
            list.add(followerResponseDto);
        }
        return new PageImpl<>(list, followerByUserId.getPageable(), followerByUserId.getTotalElements());
    }
}

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
    public List<FolloweeResponseDto> selectFolloweeList(Long userId){
        //userId로 user 찾는다- 주체
        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("존재하지 않는 User 입니다."));
        //찾은 유저가 팔로우 하고있는 팔로우정보를 가져온다.
        List<Follow> followeeList = findUser.getFollowerList();
        //반환할 dto리스트 선언
        List<FolloweeResponseDto> list = new ArrayList<>();
        //dto 객체 만들어서 리스트로 반환
        for (Follow follow : followeeList) {
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
        return list;
    }
    //나를 팔로워 하는사람
    public List<FollowerResponseDto> selectFollowerList(Long userId){
        //userId로 user 찾는다- 주체
        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new IllegalArgumentException("존재하지 않는 User 입니다."));
        //찾은 유저가 팔로우 당하고 있는 팔로워정보를 가져온다.
        List<Follow> followerList = findUser.getFolloweeList();
        //반환할 dto리스트 선언
        List<FollowerResponseDto> list = new ArrayList<>();
        //dto 객체 만들어서 리스트로 반환
        for (Follow follow : followerList) {
            //user가 팔로우하는 대상
            User follower = follow.getFollower();
            list.add(FollowerResponseDto.builder()
                    .id(follower.getId())
                    .email(follower.getEmail())
                    .name(follower.getName())
                    .nickname((follower.getNickname()))
                    .build()
            );
        }
        return list;
    }

}

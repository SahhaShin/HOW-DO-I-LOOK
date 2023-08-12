package com.ssafy.howdoilook.domain.follow.service;

import com.ssafy.howdoilook.domain.follow.dto.request.FollowDeleteRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.request.FollowSaveRequestDto;
import com.ssafy.howdoilook.domain.follow.dto.response.FolloweeResponseDto;
import com.ssafy.howdoilook.domain.follow.dto.response.FollowerResponseDto;
import com.ssafy.howdoilook.domain.follow.dto.response.PerfectFollowResponseDto;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.follow.repository.FollowReposiroty;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.handler.AccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FollowService {
    private final FollowReposiroty followRepository;
    private final UserRepository userRepository;

    //데이터가 중복으로 삽입되는거 ifelse로 처리했는데 예외로 처리하면 더 좋을거 같다.
    @Transactional
    public Long saveFollow(FollowSaveRequestDto followSaveRequestDto, UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        User follower = userRepository.findById(followSaveRequestDto.getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 follower입니다.",1));

        if (!clientEmail.equals(follower.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        User followee = userRepository.findById(followSaveRequestDto.getTargetId())
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 followee입니다.",1));

        //null값이 아니면 이미 데이터가 있는 것이다.
        Follow findFollow = followRepository.findFollowIdByFollowerAndFollowee(follower.getId(), followee.getId());
        //데이터가 없을때(정상일때)
        if (findFollow == null) {
            Follow follow = Follow.builder()
                    .follower(follower)
                    .followee(followee)
                    .build();
            followRepository.save(follow);

            return follow.getId();
        } else {
            throw new IllegalArgumentException("이미 존재하는 Follow입니다.");
        }
    }


    @Transactional
    public void deleteFollow(FollowDeleteRequestDto followDeleteRequestDto, UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        User follower = userRepository.findById(followDeleteRequestDto.getId())
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 follower입니다.",1));

        if (!clientEmail.equals(follower.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        Follow findFollow = followRepository.findFollowIdByFollowerAndFollowee(
                followDeleteRequestDto.getId(), followDeleteRequestDto.getTargetId());
        //팔로우 관계가 있을 때
        if (findFollow != null) {
            followRepository.deleteById(findFollow.getId());
        }else{
            throw new IllegalArgumentException("존재하지 않는 Follow입니다.");
        }
    }
    //내가 팔로우 하는 사람 리스트 반환
    public Page<FolloweeResponseDto> selectFolloweeList(Long userId, Pageable page){
        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        Page<Follow> followeeByUserId = followRepository.findFolloweeByUserId(userId, page);
        List<Follow> content = followeeByUserId.getContent();

        List<FolloweeResponseDto> list = new ArrayList<>();

        //dto 객체 만들어서 리스트로 반환
        for (Follow follow : content) {
            //user가 팔로우하는 대상
            User followee = follow.getFollowee();
            list.add(FolloweeResponseDto.builder()
                    .id(followee.getId())
                    .nickname(followee.getNickname())
                    .profileImg(followee.getProfileImg())
                    .build()
            );
        }
        return new PageImpl<>(list, followeeByUserId.getPageable(), followeeByUserId.getTotalElements());
    }
    
    //나를 팔로워 하는사람
    public Page<FollowerResponseDto> selectFollowerList(Long userId,Pageable page){

        User findUser = userRepository.findById(userId).orElseThrow(
                ()->new EmptyResultDataAccessException("존재하지 않는 User 입니다.",1));

        Page<Follow> followerByUserId = followRepository.findFollowerByUserId(userId, page);
        List<Follow> content = followerByUserId.getContent();

        //반환할 dto리스트 선언
        List<FollowerResponseDto> list = new ArrayList<>();

        //dto 객체 만들어서 리스트로 반환
        for (Follow follow : content) {
            User follower = follow.getFollower();
            FollowerResponseDto followerResponseDto = FollowerResponseDto.builder()
                    .id(follower.getId())
                    .nickname(follower.getNickname())
                    .profileImg(follower.getProfileImg())
                    .build();
            list.add(followerResponseDto);
        }
        return new PageImpl<>(list, followerByUserId.getPageable(), followerByUserId.getTotalElements());
    }
    
    /*
    * 내 팔로잉 리스트
    * */
    public List<FolloweeResponseDto> getAllFolloweeList(Long userId) {
        // userId : 나
        List<Follow> allFolloweeList = followRepository.findAllFolloweeByUserId(userId);

        List<FolloweeResponseDto> followeeResponseDtoList = new ArrayList<>();

        for (Follow follow : allFolloweeList) {
            FolloweeResponseDto followeeResponseDto = FolloweeResponseDto.builder()
                    .id(follow.getFollowee().getId())
                    .nickname(follow.getFollowee().getNickname())
                    .profileImg(follow.getFollowee().getProfileImg())
                    .build();

            followeeResponseDtoList.add(followeeResponseDto);
        }

        return followeeResponseDtoList;
    }
    
    /*
    * 내 팔로워 리스트
    * */
    public List<FollowerResponseDto> getAllFollowerList(Long userId) {
        List<Follow> allFollowerList = followRepository.findAllFollowerByUserId(userId);

        List<FollowerResponseDto> followerResponseDtoList = new ArrayList<>();

        for (Follow follow : allFollowerList) {
            FollowerResponseDto followerResponseDto = FollowerResponseDto.builder()
                    .id(follow.getFollower().getId())
                    .nickname(follow.getFollower().getNickname())
                    .profileImg(follow.getFollower().getProfileImg())
                    .build();

            followerResponseDtoList.add(followerResponseDto);
        }

        return followerResponseDtoList;
    }

    public List<PerfectFollowResponseDto> getPerfectFollowList() {

        return followRepository.findPerfectFollowers();
    }
}

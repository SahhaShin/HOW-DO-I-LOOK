package com.ssafy.howdoilook.domain.blacklist.service;

import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListDeleteRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListSaveRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.response.BlackListSelectResponseDto;
import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import com.ssafy.howdoilook.domain.blacklist.repository.BlackListRepository;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.handler.AccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BlackListService {

    private final BlackListRepository blackListRepository;

    private final UserRepository userRepository;

    public Page<BlackListSelectResponseDto> findBlackListByUserId(Long userId,UserDetails userDetails, Pageable pageable){
        String clientEmail = userDetails.getUsername();
        User findUser = userRepository.findById(userId).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        if (!clientEmail.equals(findUser.getEmail())) {
            throw new AccessException("접근 권한이 없습니다.");
        }

        Page<BlackList> blackLists = blackListRepository.selectBlackListByUserId(userId, pageable);
        List<BlackList> content = blackLists.getContent();
        List<BlackListSelectResponseDto> blackListSelectResponseDtoList = new ArrayList<>();
        for (BlackList blackList : content) {
            User targetUser = blackList.getTargetUser();
            BlackListSelectResponseDto blacklistdto = BlackListSelectResponseDto.builder()
                    .id(userId)
                    .targetUserId(targetUser.getId())
                    .nickname(targetUser.getNickname())
                    .profileImg(targetUser.getProfileImg())
                    .gender(targetUser.getGender())
                    .showBadgeType(targetUser.getShowBadgeType())
                    .build();
            blackListSelectResponseDtoList.add(blacklistdto);
        }
        return new PageImpl<>(blackListSelectResponseDtoList,pageable,blackLists.getTotalElements());
    }
    @Transactional
    public Long saveBlackList(BlackListSaveRequestDto blackListSaveRequestDto, UserDetails userDetails){
        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(blackListSaveRequestDto.getUserId()).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        if (!clientEmail.equals(user.getEmail())) {
            throw new AccessException("접근 권한이 없습니다.");
        }

        if(blackListSaveRequestDto.getUserId() == blackListSaveRequestDto.getTargetUserId()) {
            throw new IllegalArgumentException("자기 자신은 블랙리스트 처리할 수 없습니다.");
        }

        Optional<BlackList> blackList = blackListRepository.selectBlackListByUserIdTargetUserId(blackListSaveRequestDto.getUserId(),
                blackListSaveRequestDto.getTargetUserId());
        if (blackList.isPresent()){
            throw new IllegalArgumentException("이미 존재하는 BlackList입니다.");
        }
        else{
            User findUser = userRepository.findById(blackListSaveRequestDto.getUserId()).orElseThrow(
                    () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));
            User findTargetUser = userRepository.findById(blackListSaveRequestDto.getTargetUserId()).orElseThrow(
                    () -> new EmptyResultDataAccessException("존재하지 않는 TargetUser입니다.",1));
            BlackList blacklist = BlackList.builder()
                    .user(findUser)
                    .targetUser(findTargetUser)
                    .build();
            blackListRepository.save(blacklist);
            return blacklist.getId();
        }
    }
    @Transactional
    public void deleteBlackList(BlackListDeleteRequestDto blackListDeleteRequestDto,UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        User user = userRepository.findById(blackListDeleteRequestDto.getUserId()).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        if (!clientEmail.equals(user.getEmail())) {
            throw new AccessException("접근 권한이 없습니다.");
        }


        BlackList blackList = blackListRepository.selectBlackListByUserIdTargetUserId(blackListDeleteRequestDto.getUserId(),
                        blackListDeleteRequestDto.getTargetUserId())
                .orElseThrow(() -> new EmptyResultDataAccessException("존재하지 않는 BlackList입니다.", 1));
        blackListRepository.deleteById(blackList.getId());
    }

    public List<BlackListSelectResponseDto> getAllBlackList(Long userId, UserDetails userDetails) {
        String clientEmail = userDetails.getUsername();

        User user = userRepository.findById(userId).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        if (!clientEmail.equals(user.getEmail())) {
            throw new AccessException("접근 권한이 없습니다.");
        }

        List<BlackListSelectResponseDto> blackListSelectResponseDtoList = new ArrayList<>();

        List<BlackList> blackList = blackListRepository.getAllBlackList(userId);

        for (BlackList black : blackList) {
            BlackListSelectResponseDto blackListSelectResponseDto = BlackListSelectResponseDto.builder()
                    .id(black.getUser().getId())
                    .nickname(black.getTargetUser().getNickname())
                    .profileImg(black.getTargetUser().getProfileImg())
                    .targetUserId(black.getTargetUser().getId())
                    .gender(black.getTargetUser().getGender())
                    .showBadgeType(black.getTargetUser().getShowBadgeType())
                    .build();

            blackListSelectResponseDtoList.add(blackListSelectResponseDto);
        }

        return blackListSelectResponseDtoList;
    }
}

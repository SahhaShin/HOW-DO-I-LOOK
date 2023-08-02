package com.ssafy.howdoilook.domain.blacklist.service;

import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListDeleteRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.request.BlackListSaveRequestDto;
import com.ssafy.howdoilook.domain.blacklist.dto.response.BlackListSelectResponseDto;
import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import com.ssafy.howdoilook.domain.blacklist.repository.BlackListRepository;
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
public class BlackListService {
    private final BlackListRepository blackListRepository;
    private final UserRepository userRepository;

    public Page<BlackListSelectResponseDto> findBlackListByUserId(Long userId, Pageable pageable){
        Page<BlackList> blackLists = blackListRepository.selectBlackListByUserId(userId, pageable);
        List<BlackList> content = blackLists.getContent();
        List<BlackListSelectResponseDto> blackListSelectResponseDtoList = new ArrayList<>();
        for (BlackList blackList : content) {
            User targetUser = blackList.getTargetUser();
            BlackListSelectResponseDto blacklistdto = BlackListSelectResponseDto.builder()
                    .id(targetUser.getId())
                    .email(targetUser.getEmail())
                    .name(targetUser.getName())
                    .nickname(targetUser.getNickname())
                    .build();
            blackListSelectResponseDtoList.add(blacklistdto);
        }
        return new PageImpl<>(blackListSelectResponseDtoList,pageable,blackLists.getTotalElements());
    }
    @Transactional
    public Long saveBlackList(BlackListSaveRequestDto blackListSaveRequestDto){
        User findUser = userRepository.findById(blackListSaveRequestDto.getUserId())
                .orElseThrow(()->new IllegalArgumentException("존재하지 않는 User입니다."));
        User findTargetUser = userRepository.findById(blackListSaveRequestDto.getTargetUserId())
                .orElseThrow(()->new IllegalArgumentException("존재하지 않는 User입니다."));
        BlackList blacklist = BlackList.builder()
                .user(findUser)
                .targetUser(findTargetUser)
                .build();
        blackListRepository.save(blacklist);
        return blacklist.getId();
    }
    @Transactional
    public void deleteBlackList(BlackListDeleteRequestDto blackListDeleteRequestDto){
        blackListRepository.deleteBlackList(blackListDeleteRequestDto.getUserId(),blackListDeleteRequestDto.getTargetUserId());
    }

}

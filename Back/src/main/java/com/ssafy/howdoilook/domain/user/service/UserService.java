package com.ssafy.howdoilook.domain.user.service;

import com.ssafy.howdoilook.domain.user.dto.request.UserSearchCondition;
import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import com.ssafy.howdoilook.domain.user.dto.response.UserSearchResponseDto;
import com.ssafy.howdoilook.domain.user.dto.response.UserSimpleResponseDto;
import com.ssafy.howdoilook.domain.user.entity.Role;
import com.ssafy.howdoilook.domain.user.entity.SocialType;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.redis.service.RedisAccessTokenService;
import com.ssafy.howdoilook.global.redis.service.RedisRefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private final RedisAccessTokenService redisAccessTokenService;


    /*
    * 일반 회원 가입
    * */
    @Transactional
    public Long signUp(UserSignUpRequestDto userSignUpRequestDto) throws Exception {
        if(userRepository.findByEmail(userSignUpRequestDto.getEmail()).isPresent())
            throw new Exception("이미 존재하는 이메일입니다.");

        if(userRepository.findByNickname(userSignUpRequestDto.getNickname()).isPresent())
            throw new Exception("이미 존재하는 닉네임입니다.");

        User user = userSignUpRequestDto.toEntity();

        user.passwordEncode(passwordEncoder);

        userRepository.save(user);

        return user.getId();
    }

    public String logout(String accessToken, String email) {
        redisRefreshTokenService.deleteRefreshToken(email);
        redisAccessTokenService.setRedisAccessToken(accessToken);
        
        return "로그아웃 성공(accessToken blacklist 추가 및 refreshToken 삭제)";
    }

    public UserSimpleResponseDto getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        return new UserSimpleResponseDto(user);
    }

    public List<UserSimpleResponseDto> getUserList() {
        List<User> userList = userRepository.findAll();

        List<UserSimpleResponseDto> userDtoList = new ArrayList<>();

        for (User user : userList)
            userDtoList.add(new UserSimpleResponseDto(user));

        return userDtoList;
    }

    public List<UserSearchResponseDto> searchUsers(UserSearchCondition userSearchCondition) {

        return userRepository.search(userSearchCondition);
    }

    public Page<UserSearchResponseDto> searchPagedUsers(UserSearchCondition condition, Pageable pageable) {

        return userRepository.searchPage(condition, pageable);
    }

    public List<UserSearchResponseDto> searchScrollPagedUsers(UserSearchCondition condition, int scrollOffset, int pageSize) {

        return userRepository.searchScrollPage(condition, scrollOffset, pageSize);
    }
}

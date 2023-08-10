package com.ssafy.howdoilook.domain.user.service;

import com.ssafy.howdoilook.domain.badge.entity.Badge;
import com.ssafy.howdoilook.domain.badge.repository.BadgeRepository;
import com.ssafy.howdoilook.domain.user.dto.request.*;
import com.ssafy.howdoilook.domain.user.dto.response.UserSearchResponseDto;
import com.ssafy.howdoilook.domain.user.dto.response.UserSimpleResponseDto;
import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.ClosetAccess;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.handler.NoContentException;
import com.ssafy.howdoilook.global.redis.service.RedisAccessTokenService;
import com.ssafy.howdoilook.global.redis.service.RedisRankingService;
import com.ssafy.howdoilook.global.redis.service.RedisRefreshTokenService;
import com.ssafy.howdoilook.global.s3upload.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.expression.AccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final RedisRefreshTokenService redisRefreshTokenService;

    private final RedisAccessTokenService redisAccessTokenService;

    private final RedisRankingService redisRankingService;

    private final BadgeRepository badgeRepository;

    private final ImageService imageService;

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

        user.updateProfileImage("https://howdobucket.s3.ap-northeast-2.amazonaws.com/DefaultProfile.png");

        user.updateShowBadge(BadgeType.X);

        user.updateClosetAccess(ClosetAccess.PUBLIC);

        User saveUser = userRepository.save(user);

        redisRankingService.updateScore(String.valueOf(BadgeType.SEXY), saveUser.getId(), 0);
        redisRankingService.updateScore(String.valueOf(BadgeType.LOVELY), saveUser.getId(), 0);
        redisRankingService.updateScore(String.valueOf(BadgeType.NATURAL), saveUser.getId(), 0);
        redisRankingService.updateScore(String.valueOf(BadgeType.MODERN), saveUser.getId(), 0);

        return saveUser.getId();
    }

    /*
    * 회원 즉시 탈퇴
    * */
    @Transactional
    public Long quit(String accessToken, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        redisRefreshTokenService.deleteRefreshToken(user.getEmail());
        redisAccessTokenService.setRedisAccessToken(accessToken, "QUIT");
        redisRankingService.deleteScore(id);

        userRepository.deleteById(user.getId());

        return user.getId();
    }

    /*
    * 로그아웃
    * */
    public String logout(String accessToken, Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        redisRefreshTokenService.deleteRefreshToken(user.getEmail());
        redisAccessTokenService.setRedisAccessToken(accessToken, "LOGOUT");
        
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

    public boolean checkUserEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent())
            return true;
        else
            return false;
    }

    public long getUserIdByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        return user.getId();
    }

    public boolean checkUserNickname(String nickname) {
        Optional<User> user = userRepository.findByNickname(nickname);

        if(user.isPresent())
            return true;
        else
            return false;
    }
    
    /*
    * 유저 검색 (페이징 X)
    * */
    public List<UserSearchResponseDto> searchUsers(UserSearchCondition userSearchCondition) {

        return userRepository.search(userSearchCondition);
    }

    /*
    * 유저 검색 (전통적인 페이징)
    * */
    public Page<UserSearchResponseDto> searchPagedUsers(UserSearchCondition condition, Pageable pageable) {

        return userRepository.searchPage(condition, pageable);
    }

    
    /*
    * 유저 검색 (스크롤 페이징)
    * */
    public List<UserSearchResponseDto> searchScrollPagedUsers(UserSearchCondition condition, int scrollOffset, int pageSize) {

        return userRepository.searchScrollPage(condition, scrollOffset, pageSize);
    }
    
    /*
    * 소셜 로그인 유저 추가 정보 입력
    * */
    @Transactional
    public Long updateSocialUserInfo(String email, UserBySocialUpdateRequestDto userBySocialUpdateRequestDto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 존재하지 않습니다."));

        user.updateShowBadge(BadgeType.X);
        user.updateClosetAccess(ClosetAccess.PUBLIC);

        return user.socialUserInfoUpdate(userBySocialUpdateRequestDto);
    }

    /*
    * 유저 정보 변경 (나이, 성별, 이름, 닉네임, 접근 권한)
    * */
    @Transactional
    public Long updateUserInfo(Long id, UserUpdateRequestDto userUpdateRequestDto) throws IOException, AccessException {
//    public Long updateUserInfo(Long id, UserUpdateRequestDto userUpdateRequestDto, UserDetails userDetails) throws IOException, AccessException {
//        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

//        if (!clientEmail.equals(user.getEmail())){
//            throw new AccessException("접근 권한이 없습니다.");
//        }
        System.out.println("userUpdateRequestDto = " + userUpdateRequestDto.getNickname());
        System.out.println("userUpdateRequestDto = " + userUpdateRequestDto.getAge());
        return user.updateUserInfo(userUpdateRequestDto);
    }

    /*
    * 유저 정보 변경 (나이, 성별, 이름, 닉네임, 접근 권한, 프로필 이미지)
    * */
    @Transactional
    public Long updateUserInfoAndImage(Long id, UserUpdateIncludeImageRequestDto userUpdateIncludeImageRequestDto, MultipartFile multipartFile, UserDetails userDetails) throws IOException, AccessException {
        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        return user.updateUserInfoAndImage(userUpdateIncludeImageRequestDto, imageService.updateImage(user.getProfileImg(), multipartFile));
    }

    public void deleteProfileImg(Long userId, UserDetails userDetails) throws AccessException {
        String clientEmail = userDetails.getUsername();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EmptyResultDataAccessException("해당 유저가 존재하지 않습니다", 1));

        if (!clientEmail.equals(user.getEmail())){
            throw new AccessException("접근 권한이 없습니다.");
        }

        imageService.deleteImage(user.getProfileImg());

        user.updateProfileImg(null);
    }

    /*
    * 유저 대표 뱃지 수정
    * */
    @Transactional
    public Long updateShowBadge(Long id, String badge) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 유저 존재 X"));

        List<Badge> badgeList = badgeRepository.findAllByUser(user);

        boolean flag = false;

        for (Badge b : badgeList) {
            if(b.getBadgeType() == BadgeType.valueOf(badge)) {
                flag = true;
                break;
            }
        }

        if(!flag)
            throw new NoContentException("해당 뱃지는 수여받은 적이 없습니다.");

        if(badgeList.size() == 0)
            throw new NoContentException("대표로 지정할 뱃지가 존재하지 않습니다.");


        return user.updateShowBadge(BadgeType.valueOf(badge));
    }

    public UserSimpleResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(" 해당 유저존재 X"));

        return UserSimpleResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .gender(user.getGender())
                .age(user.getAge())
                .profileImg(user.getProfileImg())
                .role(user.getRole())
                .socialType(user.getSocialType())
                .showBadgeType(user.getShowBadgeType())
                .closetAccess(user.getClosetAccess())
                .build();
    }
}

package com.ssafy.howdoilook.domain.user.entity;

import com.ssafy.howdoilook.domain.alarm.entity.Alarm;
import com.ssafy.howdoilook.domain.badge.entity.Badge;
import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import com.ssafy.howdoilook.domain.clothes.entity.Clothes;
import com.ssafy.howdoilook.domain.comment.entity.Comment;
import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.feed.entity.Feed;
import com.ssafy.howdoilook.domain.feedLike.entity.FeedLike;
import com.ssafy.howdoilook.domain.follow.entity.Follow;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUser;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.user.dto.request.UserBySocialUpdateRequestDto;
import com.ssafy.howdoilook.domain.user.dto.request.UserUpdateIncludeImageRequestDto;
import com.ssafy.howdoilook.domain.user.dto.request.UserUpdateRequestDto;
import com.ssafy.howdoilook.domain.userLike.entity.UserLike;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "users")
public class User extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "user_email", unique = true)
    private String email; // 이메일이자 로그인할 때 사용하는 id

    @Column(name = "user_pw")
    private String password;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_nickname", unique = true)
    private String nickname;

    @Column(name = "user_gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "user_age")
    private int age;

    @Column(name = "user_profile_img")
    private String profileImg;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_role")
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_social_type")
    private SocialType socialType;

    @Column(name = "user_social_id")
    private String socialId;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_show_badge")
    private BadgeType showBadgeType;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_closet_access")
    private ClosetAccess closetAccess;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Alarm> alarmList = new ArrayList<>();

    @OneToMany(mappedBy = "senderUser", cascade = CascadeType.ALL)
    List<Alarm> senderAlarmList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<BlackList> blackList = new ArrayList<>();

    @OneToMany(mappedBy = "targetUser", cascade = CascadeType.ALL)
    List<BlackList> targetBlackList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Clothes> clothesList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Feed> feedList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<FeedLike> feedLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "follower", cascade = CascadeType.ALL)
    List<Follow> followerList = new ArrayList<>();

    @OneToMany(mappedBy = "followee", cascade = CascadeType.ALL)
    List<Follow> followeeList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<RoomUser> roomUserList = new ArrayList<>();

    @OneToMany(mappedBy = "userA", cascade = CascadeType.ALL)
    List<SoloChatRoom> soloAChatRoomList = new ArrayList<>();

    @OneToMany(mappedBy = "userB", cascade = CascadeType.ALL)
    List<SoloChatRoom> soloBChatRoomList = new ArrayList<>();

    @OneToMany(mappedBy = "targetUser", cascade = CascadeType.ALL)
    List<UserLike> userLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Badge> badgeList = new ArrayList<>();

    @Builder
    public User(Long id, String email, String password, String name, String nickname, Gender gender, int age, String profileImg, Role role, SocialType socialType, String socialId, BadgeType showBadgeType, ClosetAccess closetAccess) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.gender = gender;
        this.age = age;
        this.profileImg = profileImg;
        this.role = role;
        this.socialType = socialType;
        this.socialId = socialId;
        this.showBadgeType = showBadgeType;
        this.closetAccess = closetAccess;
    }

    /*
    * 권한 설정
    * */
    public void authorizeUser() {
        this.role = Role.USER;
    }

    /*
    * 비밀번호 암호화
    * */
    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.password = passwordEncoder.encode(this.password);
    }

    /*
    * 소셜 로그인 유저 추가 정보 업데이트
    * */
    public Long socialUserInfoUpdate(UserBySocialUpdateRequestDto userBySocialUpdateRequestDto) {
        this.age = userBySocialUpdateRequestDto.getAge();
        this.nickname = userBySocialUpdateRequestDto.getNickname();
        this.gender = userBySocialUpdateRequestDto.getGender();
        this.role = Role.USER;

        return this.id;
    }

    /*
    * 유저 정보 수정 (정보)
    * */
    public Long updateUserInfo(UserUpdateRequestDto userUpdateRequestDto) {
        this.age = userUpdateRequestDto.getAge();
        this.gender = userUpdateRequestDto.getGender();
        this.nickname = userUpdateRequestDto.getNickname();
        this.name = userUpdateRequestDto.getName();
        this.closetAccess = userUpdateRequestDto.getClosetAccess();

        return this.id;
    }

    public Long updateProfileImage(String profileImg) {
        this.profileImg = profileImg;

        return this.id;
    }

    /*
    * 유저 정보 수정 (정보 + 이미지)
    * */
    public Long updateUserInfoAndImage(UserUpdateIncludeImageRequestDto userUpdateIncludeImageRequestDto, String profileImg) {
        this.age = userUpdateIncludeImageRequestDto.getAge();
        this.gender = userUpdateIncludeImageRequestDto.getGender();
        this.nickname = userUpdateIncludeImageRequestDto.getNickname();
        this.name = userUpdateIncludeImageRequestDto.getName();
        this.profileImg = profileImg;
        this.closetAccess = userUpdateIncludeImageRequestDto.getClosetAccess();

        return this.id;
    }

    /*
    * 유저 대표 뱃지 설정
    * */
    public Long updateShowBadge(BadgeType likeType) {
        this.showBadgeType = likeType;

        return this.id;
    }

    /*
    * 유저 옷장 접근 권한 설정
    * */
    public Long updateClosetAccess(ClosetAccess closetAccess) {
        this.closetAccess = closetAccess;

        return this.id;
    }

    public void updateProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
}

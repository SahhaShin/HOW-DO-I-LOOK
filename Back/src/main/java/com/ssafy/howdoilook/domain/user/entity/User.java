package com.ssafy.howdoilook.domain.user.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.user.dto.request.UserBySocialUpdateRequestDto;
import com.ssafy.howdoilook.domain.user.dto.request.UserUpdateRequestDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "users")
public class User extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_no")
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
    private Role role;

    @Enumerated(EnumType.STRING)
    private SocialType socialType;

    private String socialId;

    @Builder
    public User(Long id, String email, String password, String name, String nickname, Gender gender, int age, String profileImg, Role role, SocialType socialType, String socialId) {
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
    * 유저 정보 수정
    * */
    public Long updateUserInfo(UserUpdateRequestDto userUpdateRequestDto) {
        this.age = userUpdateRequestDto.getAge();
        this.gender = userUpdateRequestDto.getGender();
        this.nickname = userUpdateRequestDto.getNickname();
        this.name = userUpdateRequestDto.getName();

        return this.id;
    }
}

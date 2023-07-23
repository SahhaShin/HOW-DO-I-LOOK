package com.ssafy.howdoilook.domain.user.service;

import com.ssafy.howdoilook.domain.user.dto.request.UserSignUpRequestDto;
import com.ssafy.howdoilook.domain.user.entity.Role;
import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

//    private final UserRepository userRepository;
//
//    // 일단 에러나는데 추후 고칠 예정
//    private final PasswordEncoder passwordEncoder;
//
//    /*
//    * 일반 회원 가입
//    * */
//    @Transactional
//    public Long signUp(UserSignUpRequestDto userSignUpRequestDto) throws Exception {
//        if(userRepository.findByEmail(userSignUpRequestDto.getEmail()).isPresent())
//            throw new Exception("이미 존재하는 이메일입니다.");
//
//        if(userRepository.findByNickname(userSignUpRequestDto.getNickname()).isPresent())
//            throw new Exception("이미 존재하는 닉네임입니다.");
//
//        User user = User.builder()
//                .email(userSignUpRequestDto.getEmail())
//                .password(userSignUpRequestDto.getPassword())
//                .name(userSignUpRequestDto.getName())
//                .nickname(userSignUpRequestDto.getNickname())
//                .age(userSignUpRequestDto.getAge())
//                .gender(userSignUpRequestDto.getGender())
//                .role(Role.USER)
//                .build();
//
//        user.passwordEncode(passwordEncoder);
//
//        userRepository.save(user);
//
//        return user.getId();
//    }
}

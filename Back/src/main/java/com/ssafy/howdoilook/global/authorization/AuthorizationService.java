package com.ssafy.howdoilook.global.authorization;

import com.ssafy.howdoilook.domain.user.entity.User;
import com.ssafy.howdoilook.domain.user.repository.UserRepository;
import com.ssafy.howdoilook.global.handler.AccessException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class AuthorizationService {

    private final UserRepository userRepository;

    public User auth(Long userId,UserDetails userDetails){
        String clientEmail = userDetails.getUsername();

        User findUser = userRepository.findById(userId).orElseThrow(
                () -> new EmptyResultDataAccessException("존재하지 않는 User입니다.",1));

        if (!findUser.getEmail().equals(clientEmail)){
            throw new AccessException("접근 권한이 없습니다.");
        }

        return findUser;
    }
}

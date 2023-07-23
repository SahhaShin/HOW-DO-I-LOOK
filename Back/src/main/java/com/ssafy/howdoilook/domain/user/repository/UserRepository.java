package com.ssafy.howdoilook.domain.user.repository;

import com.ssafy.howdoilook.domain.user.entity.SocialType;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    /*
    * 소셜 타입 & 소셜 식별 값으로 회원을 찾는 메서드
    * 소셜 로그인 시 추가 정보를 입력받지 않은 상태에서 사용
    * */
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    @Override
    <S extends User> S save(S entity);
}

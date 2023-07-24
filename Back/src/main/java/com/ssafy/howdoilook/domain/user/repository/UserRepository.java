package com.ssafy.howdoilook.domain.user.repository;

import com.ssafy.howdoilook.domain.user.entity.SocialType;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long>,
        UserCustomRepository,
        QuerydslPredicateExecutor<User> {

    Optional<User> findByEmail(String email);

    Optional<User> findByNickname(String nickname);

    /*
    * 소셜 타입 & 소셜 식별 값으로 회원을 찾는 메서드
    * 소셜 로그인 시 추가 정보를 입력받지 않은 상태에서 사용
    * */
    Optional<User> findBySocialTypeAndSocialId(SocialType socialType, String socialId);

    @EntityGraph(attributePaths = {})
    @Override
    <S extends User> S save(S entity);
}

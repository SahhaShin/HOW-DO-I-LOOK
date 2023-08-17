package com.ssafy.howdoilook.domain.user.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.user.dto.request.UserSearchCondition;
import com.ssafy.howdoilook.domain.user.dto.response.QUserSearchResponseDto;
import com.ssafy.howdoilook.domain.user.dto.response.UserSearchResponseDto;
import com.ssafy.howdoilook.domain.user.entity.BadgeType;
import com.ssafy.howdoilook.domain.user.entity.Gender;
import com.ssafy.howdoilook.domain.user.entity.SocialType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.howdoilook.domain.user.entity.QUser.user;
import static org.springframework.util.StringUtils.hasText;

public class UserCustomRepositoryImpl implements UserCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public UserCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<UserSearchResponseDto> search(UserSearchCondition condition) {
        return jpaQueryFactory
                .select(new QUserSearchResponseDto(
                        user.id.as("userId"),
                        user.email,
                        user.name,
                        user.nickname,
                        user.gender,
                        user.age,
                        user.socialType,
                        user.showBadgeType
                ))
                .from(user)
//                .leftJoin(, )
                .where(
                        emailEq(condition.getEmail()),
                        nameEq(condition.getName()),
                        nicknameEq(condition.getNickname()),
                        genderEq(condition.getGender()),
                        socialTypeEq(condition.getSocialType()),
                        showBadgeTypeEq(condition.getShowBadgeType()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                )
                .fetch();
    }

    @Override
    public Page<UserSearchResponseDto> searchPage(UserSearchCondition condition, Pageable pageable) {
        List<UserSearchResponseDto> content = jpaQueryFactory
                .select(new QUserSearchResponseDto(
                        user.id.as("userId"),
                        user.email,
                        user.name,
                        user.nickname,
                        user.gender,
                        user.age,
                        user.socialType,
                        user.showBadgeType
                ))
                .from(user)
//                .leftJoin(, )
                .where(
                        emailEq(condition.getEmail()),
                        nameEq(condition.getName()),
                        nicknameEq(condition.getNickname()),
                        genderEq(condition.getGender()),
                        socialTypeEq(condition.getSocialType()),
                        showBadgeTypeEq(condition.getShowBadgeType()),

                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        JPAQuery countQuery = jpaQueryFactory
                .select(user)
                .from(user)
//                .leftJoin()
                .where(
                        emailEq(condition.getEmail()),
                        nameEq(condition.getName()),
                        nicknameEq(condition.getNickname()),
                        genderEq(condition.getGender()),
                        socialTypeEq(condition.getSocialType()),
                        showBadgeTypeEq(condition.getShowBadgeType()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                );

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchCount);
    }

    public List<UserSearchResponseDto> searchScrollPage(UserSearchCondition condition, int scrollOffset, int pageSize) {
        List<UserSearchResponseDto> content = jpaQueryFactory
                .select(new QUserSearchResponseDto(
                        user.id.as("userId"),
                        user.email,
                        user.name,
                        user.nickname,
                        user.gender,
                        user.age,
                        user.socialType,
                        user.showBadgeType
                ))
                .from(user)
                .where(
                        emailEq(condition.getEmail()),
                        nameEq(condition.getName()),
                        nicknameEq(condition.getNickname()),
                        genderEq(condition.getGender()),
                        socialTypeEq(condition.getSocialType()),
                        showBadgeTypeEq(condition.getShowBadgeType()),
                        ageGoe(condition.getAgeGoe()),
                        ageLoe(condition.getAgeLoe())
                )
                .offset(scrollOffset)
                .limit(pageSize)
                .fetch();

        return content;
    }
    // 동적 쿼리 용 메서드

    private BooleanExpression emailEq(String email) {

        return hasText(email) ? user.email.eq(email) : null;
    }

    private BooleanExpression nicknameEq(String nickname) {

        return hasText(nickname) ? user.nickname.eq(nickname) : null;
    }

    private BooleanExpression nameEq(String name) {

        return hasText(name) ? user.name.eq(name) : null;
    }

    private BooleanExpression genderEq(Gender gender) {

        return gender != null ? user.gender.eq(gender) : null;
    }

    private BooleanExpression ageEq(int age) {

        return age>0 ? user.age.eq(age) : null;
    }

    private BooleanExpression socialTypeEq(SocialType socialType) {

        return socialType != null ? user.socialType.eq(socialType) : null;
    }

    private BooleanExpression showBadgeTypeEq(BadgeType badgeType) {

        return badgeType != null ? user.showBadgeType.eq(badgeType) : null;
    }

    private BooleanExpression ageGoe(Integer ageGoe) {

        return ageGoe != null ? user.age.goe(ageGoe) : null;
    }

    private BooleanExpression ageLoe(Integer ageLoe) {

        return ageLoe != null ? user.age.loe(ageLoe) : null;
    }
}

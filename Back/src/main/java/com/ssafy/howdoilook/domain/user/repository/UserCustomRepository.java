package com.ssafy.howdoilook.domain.user.repository;

import com.ssafy.howdoilook.domain.user.dto.request.UserSearchCondition;
import com.ssafy.howdoilook.domain.user.dto.response.UserSearchResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserCustomRepository {

    List<UserSearchResponseDto> search(UserSearchCondition condition);

    Page<UserSearchResponseDto> searchPage(UserSearchCondition condition, Pageable pageable);
}

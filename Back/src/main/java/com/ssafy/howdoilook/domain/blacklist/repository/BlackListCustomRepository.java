package com.ssafy.howdoilook.domain.blacklist.repository;

import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BlackListCustomRepository {
    public Page<BlackList> selectBlackListByUserId(Long userId, Pageable pageable);
    public void deleteBlackList(Long userId, Long targetUserId);
}

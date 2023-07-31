package com.ssafy.howdoilook.domain.blacklist.repository;

public interface BlackListCustomRepository {

    public void deleteBlackList(Long userId, Long targetUserId);
}

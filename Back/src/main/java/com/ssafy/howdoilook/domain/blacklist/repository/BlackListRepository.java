package com.ssafy.howdoilook.domain.blacklist.repository;

import com.ssafy.howdoilook.domain.blacklist.entity.BlackList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlackListRepository extends JpaRepository<BlackList,Long>,BlackListCustomRepository {
}

package com.ssafy.howdoilook.domain.ootd.repository;

import java.util.List;

public interface OotdCustomRepository {

    List<Long> findClothesIdList(Long userId);
}

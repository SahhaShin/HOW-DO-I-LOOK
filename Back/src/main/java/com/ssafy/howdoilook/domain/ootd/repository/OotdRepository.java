package com.ssafy.howdoilook.domain.ootd.repository;

import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;
import java.util.Optional;

public interface OotdRepository
        extends JpaRepository<Ootd, Long>,
        OotdCustomRepository, QuerydslPredicateExecutor<Ootd> {

    List<Ootd> findByUser_Id(Long userId);

    Optional<Ootd> findByUser_IdAndOrder(Long userId, Integer order);
}

package com.ssafy.howdoilook.domain.hashtag.repository;

import com.ssafy.howdoilook.domain.hashtag.entity.Hashtag;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface HashTagRepository extends JpaRepository<Hashtag,Long> {
    Optional<Hashtag> findByContent(String content);

    @EntityGraph
    @Override
    <S extends Hashtag> S save(S entity);
}

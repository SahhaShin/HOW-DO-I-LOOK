package com.ssafy.howdoilook.domain.feedPhotoHashtag.repository;

import com.ssafy.howdoilook.domain.feedPhotoHashtag.entity.FeedPhotoHashtag;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FeedPhotoHashtagRepository extends JpaRepository<FeedPhotoHashtag,Long>,FeedPhotoHashtagCustomRepository{
    @EntityGraph
    @Override
    <S extends FeedPhotoHashtag> S save(S entity);

}

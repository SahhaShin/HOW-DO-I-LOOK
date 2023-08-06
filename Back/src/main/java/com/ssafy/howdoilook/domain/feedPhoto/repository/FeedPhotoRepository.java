package com.ssafy.howdoilook.domain.feedPhoto.repository;

import com.ssafy.howdoilook.domain.feedPhoto.entity.FeedPhoto;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedPhotoRepository extends JpaRepository<FeedPhoto,Long> ,FeedPhotoCustomRepository{
    @EntityGraph
    @Override
    <S extends FeedPhoto> S save(S entity);
}

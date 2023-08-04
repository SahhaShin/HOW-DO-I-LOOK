package com.ssafy.howdoilook.domain.room.repository.RoomRepository;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface RoomRepository
        extends JpaRepository<Room, Long>,
        RoomCustomRepository, QuerydslPredicateExecutor<Room> {

    Page<Room> findAll(Pageable pageable);

    Page<Room> findByType(RoomType type, Pageable pageable);

    Page<Room> findByTitleContaining(String keyword, Pageable pageable);

    Page<Room> findByTypeAndTitleContaining(RoomType type, String keyword, Pageable pageable);

}

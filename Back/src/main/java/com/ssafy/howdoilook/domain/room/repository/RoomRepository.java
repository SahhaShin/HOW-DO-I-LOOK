package com.ssafy.howdoilook.domain.room.repository;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface RoomRepository
        extends JpaRepository<Room, Long>,
        RoomCustomRepository, QuerydslPredicateExecutor<Room> {

   Page<Room> findAll(Pageable pageable);

    Page<Room> findByType(RoomType type, Pageable pageable);

//    Page<Room> findByHost_Id(Long hostId, Pageable pageable);

//    Page<Room> findByHost_IdAndType(Long hostId, RoomType type, Pageable pageable);
}

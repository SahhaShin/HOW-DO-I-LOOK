package com.ssafy.howdoilook.domain.roomUser.repository;

import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.room.entity.RoomType;
import com.ssafy.howdoilook.domain.roomUser.entity.RoomUser;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {

    List<RoomUser> findByRoom_IdAndUser_Id(Long roomId, Long userId);

}

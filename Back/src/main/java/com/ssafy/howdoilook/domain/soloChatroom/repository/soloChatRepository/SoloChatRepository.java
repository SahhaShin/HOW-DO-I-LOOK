package com.ssafy.howdoilook.domain.soloChatroom.repository.soloChatRepository;

import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SoloChatRepository extends JpaRepository<SoloChat, Long> {
    @Query("SELECT c FROM SoloChat c WHERE c.room.id = :roomId")
    List<SoloChat> findByRoomId(@Param("roomId") long roomId);

}

package com.ssafy.howdoilook.domain.soloChatroom.repository.soloChatRepository;

import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SoloChatRepository extends JpaRepository<SoloChat, Long> {
    List<SoloChat> findByRoomId(Long roomId);


    

}

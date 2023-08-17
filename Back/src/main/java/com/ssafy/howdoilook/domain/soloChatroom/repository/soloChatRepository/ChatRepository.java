package com.ssafy.howdoilook.domain.soloChatroom.repository.soloChatRepository;

import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChat;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<SoloChat, String> {

    List<SoloChat> findAllByRoomIdOrderByTimeAsc(long roomId, Pageable pagealbe);

    SoloChat findTopByRoomIdOrderByTimeDesc(long roomId);
}

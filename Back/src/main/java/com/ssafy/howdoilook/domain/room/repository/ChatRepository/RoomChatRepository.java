package com.ssafy.howdoilook.domain.room.repository.ChatRepository;

import com.ssafy.howdoilook.domain.room.entity.RoomChat;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface RoomChatRepository extends MongoRepository<RoomChat, String> {
    List<SoloChat> findAllByRoomIdOrderByTimeAsc(String roomId);

}

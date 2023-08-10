package com.ssafy.howdoilook.domain.room.repository.ChatRepository;

import com.ssafy.howdoilook.domain.room.entity.RoomChat;
import com.ssafy.howdoilook.domain.room.entity.RoomChatImage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomChatImageRepository extends MongoRepository<RoomChatImage, String> {

}

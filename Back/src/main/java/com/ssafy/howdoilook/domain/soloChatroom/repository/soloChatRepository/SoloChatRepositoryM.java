package com.ssafy.howdoilook.domain.soloChatroom.repository.soloChatRepository;

import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChat;
import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatM;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface SoloChatRepositoryM extends MongoRepository<SoloChatM,String> {

    List<SoloChatM> findByRoomId(Long roomId);
}

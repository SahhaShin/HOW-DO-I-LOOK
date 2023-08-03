package com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository;

import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SoloChatRoomRepository extends JpaRepository<SoloChatRoom,Long> {

    /*
    1. 아이디에 해당하는 모든 채팅방
    2. 아이디 두개에 해당하는 채팅방이 있는지 확인
    3. 아이디 두개에 해당하는 채팅방
    */

    int countByUserAAndUserB(User userA, User userB);

    Optional<SoloChatRoom> findByUserAAndUserB(User userA, User userB);

    @Query("SELECT c FROM SoloChatRoom c WHERE c.userA.id = :userId")
    List<SoloChatRoom> findByUserA(@Param("userId") long userId);

    Optional<SoloChatRoom> findById(long id);
}

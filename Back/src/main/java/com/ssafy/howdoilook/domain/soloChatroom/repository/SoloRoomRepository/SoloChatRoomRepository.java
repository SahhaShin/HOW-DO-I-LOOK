package com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository;

import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SoloChatRoomRepository extends JpaRepository<SoloChatRoom,Long> {

    int countByUserAAndUserB(User userA, User userB);

    @Query("SELECT c FROM SoloChatRoom c " +
            "WHERE (c.userA = :userA AND c.userB = :userB) OR (c.userA = :userB AND c.userB = :userA)")
    Optional<SoloChatRoom> findByUserAAndUserB(@Param("userA")User userA, @Param("userB")User userB);

    @Query("SELECT c FROM SoloChatRoom c WHERE (c.userA.id = :userId OR c.userB.id = :userId) ORDER BY c.chatUpdateDate DESC")
    List<SoloChatRoom> findByUser(@Param("userId") long userId);

    Optional<SoloChatRoom> findById(long id);

    @Modifying
    @Query("UPDATE SoloChatRoom c SET c.chatUpdateDate = :chatUpdateDate WHERE c.id = :roomId")
    void UpdateChatDate(@Param("roomId") long roomId, @Param("chatUpdateDate")LocalDateTime updateDate);
}

package com.ssafy.howdoilook.domain.soloChatroom.repository.SoloRoomRepository;

import com.ssafy.howdoilook.domain.soloChatroom.entity.SoloChatRoom;
import com.ssafy.howdoilook.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SoloChatRoomRepository extends JpaRepository<SoloChatRoom,Long> {

    int countByUserAAndUserB(User userA, User userB);

    Optional<SoloChatRoom> findByUserAAndUserB(User userA, User userB);

    @Query("SELECT c FROM SoloChatRoom c WHERE c.userA.id = :userId OR c.userB.id = :userId")
    List<SoloChatRoom> findByUserId(@Param("userId") long userId);

    Optional<SoloChatRoom> findById(long id);
}

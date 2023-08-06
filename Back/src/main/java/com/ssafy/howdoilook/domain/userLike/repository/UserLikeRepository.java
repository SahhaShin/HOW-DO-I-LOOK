package com.ssafy.howdoilook.domain.userLike.repository;

import com.ssafy.howdoilook.domain.roomUser.entity.RoomUser;
import com.ssafy.howdoilook.domain.userLike.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserLikeRepository extends JpaRepository<UserLike, Long> {

    List<UserLike> findByTargetUser_IdAndRoom_Id(Long userId, Long roomId);
}

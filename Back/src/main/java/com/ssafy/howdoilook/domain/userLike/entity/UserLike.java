package com.ssafy.howdoilook.domain.userLike.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import com.ssafy.howdoilook.domain.room.entity.Room;
import com.ssafy.howdoilook.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "user_like")
public class UserLike extends BaseTimeEntity {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_like_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_user_no")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_no")
    private Room room;

    @Enumerated(EnumType.STRING)
    @Column(name = "user_like_type")
    private UserLikeType type;

    @Column(name = "user_like_score")
    private int score;

    @Builder
    public UserLike(Long id, User user, Room room, UserLikeType type, int score) {
        this.id = id;
        this.user = user;
        this.room = room;
        this.type = type;
        this.score = score;
    }
}

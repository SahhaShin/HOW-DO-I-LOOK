package com.ssafy.howdoilook.domain.comment.repository;

import com.ssafy.howdoilook.domain.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long>,CommentCustomRepository {
    @Override
    List<Comment> selectCommentByFeedId(Long feedId);

    @Override
    List<Comment> selectCommentByFeedIdAndParentCommentId(Long feedId, Long parentCommentId);

}

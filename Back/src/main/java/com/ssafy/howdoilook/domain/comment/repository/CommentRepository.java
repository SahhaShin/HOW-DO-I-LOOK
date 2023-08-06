package com.ssafy.howdoilook.domain.comment.repository;

import com.ssafy.howdoilook.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment,Long>,CommentCustomRepository {
    @Override
    Page<Comment> selectCommentByFeedId(Long feedId, Pageable page);

    @Override
    Page<Comment> selectCommentByFeedIdAndParentCommentId(Long feedId, Long parentCommentId, Pageable page);
}

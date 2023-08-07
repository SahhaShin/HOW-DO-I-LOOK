package com.ssafy.howdoilook.domain.comment.repository;

import com.ssafy.howdoilook.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CommentCustomRepository {
    Page<Comment> selectCommentByFeedId(Long feedId, Pageable page);
    Page<Comment> selectCommentByFeedIdAndParentCommentId(Long feedId, Long parentCommentId, Pageable page);

    Long selectCommentCountByFeedId(Long feedId);
}

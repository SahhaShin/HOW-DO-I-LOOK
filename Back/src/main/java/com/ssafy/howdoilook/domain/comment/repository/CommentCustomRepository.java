package com.ssafy.howdoilook.domain.comment.repository;

import com.ssafy.howdoilook.domain.comment.entity.Comment;

import java.util.List;

public interface CommentCustomRepository {
    List<Comment> selectCommentByFeedId(Long feedId);
    List<Comment> selectCommentByFeedIdAndParentCommentId(Long feedId, Long parentCommentId);
}

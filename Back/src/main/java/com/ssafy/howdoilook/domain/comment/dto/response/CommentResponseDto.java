package com.ssafy.howdoilook.domain.comment.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentResponseDto {
    private Long commentId;
    //작성자
    private Long userId;
    //피드아이디
    private Long feedId;
    //부모댓글아이디
    private Long parentCommentId;
    //내용
    private String content;

    @Builder

    public CommentResponseDto(Long commentId, Long userId, Long feedId, Long parentCommentId, String content) {
        this.commentId = commentId;
        this.userId = userId;
        this.feedId = feedId;
        this.parentCommentId = parentCommentId;
        this.content = content;
    }
}
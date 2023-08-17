package com.ssafy.howdoilook.domain.comment.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentResponseDto {
    private Long commentId;
    //작성자
    private Long userId;
    //닉네임
    private String userNickname;
    //피드아이디
    private Long feedId;
    //부모댓글아이디
    private Long parentCommentId;
    //내용
    private String content;
    private LocalDateTime modifiedDate;

    private String userProfileImg;


    @Builder

    public CommentResponseDto(Long commentId, Long userId, String userNickname, Long feedId, Long parentCommentId, String content, LocalDateTime modifiedDate, String userProfileImg) {
        this.commentId = commentId;
        this.userId = userId;
        this.userNickname = userNickname;
        this.feedId = feedId;
        this.parentCommentId = parentCommentId;
        this.content = content;
        this.modifiedDate = modifiedDate;
        this.userProfileImg = userProfileImg;
    }
}

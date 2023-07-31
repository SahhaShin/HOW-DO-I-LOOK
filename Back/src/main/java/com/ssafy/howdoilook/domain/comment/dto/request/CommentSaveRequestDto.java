package com.ssafy.howdoilook.domain.comment.dto.request;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CommentSaveRequestDto {
    private Long userId;
    private Long feedId;
    private Long parentCommentId;
    private String content;
}

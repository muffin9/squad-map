package com.squadmap.core.comment.application.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Getter
public class CommentInfo {

    private final Long memberId;
    private final String memberNickname;
    private final String memberProfileImage;
    private final Long commentId;
    private final String content;
    private final LocalDateTime writtenAt;

}

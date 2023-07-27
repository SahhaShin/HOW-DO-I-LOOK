package com.ssafy.howdoilook.domain.comment.repository;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.comment.entity.Comment;
import com.ssafy.howdoilook.domain.comment.entity.QComment;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.List;


public class CommentCustomRepositoryImpl implements CommentCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    QFeed feed = QFeed.feed;
    QComment comment = QComment.comment;

    public CommentCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}

    @Override
    public List<Comment> selectCommentByFeedId(Long feedId) {
        List<Comment> findCommentList = jpaQueryFactory.select(comment)
                .from(comment)
                .where(comment.feed.id.eq(feedId).and(comment.parent.isNull()))
                .orderBy(comment.id.desc())
                .fetch();
        return findCommentList;
    }

    @Override
    public List<Comment> selectCommentByFeedIdAndParentCommentId(Long feedId, Long parentCommentId) {
        List<Comment> findCommentList = jpaQueryFactory.selectFrom(comment)
                .where(comment.feed.id.eq(feedId).and(comment.parent.id.eq(parentCommentId)))
                .orderBy(comment.id.desc())
                .fetch();
        return findCommentList;
    }
}

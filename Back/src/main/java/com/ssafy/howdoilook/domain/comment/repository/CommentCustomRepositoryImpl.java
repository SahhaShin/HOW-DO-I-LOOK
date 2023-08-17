package com.ssafy.howdoilook.domain.comment.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.howdoilook.domain.comment.entity.Comment;
import com.ssafy.howdoilook.domain.comment.entity.QComment;
import com.ssafy.howdoilook.domain.feed.entity.QFeed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import javax.persistence.EntityManager;



public class CommentCustomRepositoryImpl implements CommentCustomRepository{
    private final JPAQueryFactory jpaQueryFactory;

    QFeed feed = QFeed.feed;
    QComment comment = QComment.comment;

    public CommentCustomRepositoryImpl(EntityManager em) {this.jpaQueryFactory = new JPAQueryFactory(em);}

    @Override
    public Page<Comment> selectCommentByFeedId(Long feedId, Pageable page) {
        QueryResults<Comment> results = jpaQueryFactory.selectFrom(comment)
                .where(comment.feed.id.eq(feedId).and(comment.parent.isNull()))
                .orderBy(comment.id.desc())
                .limit(page.getPageSize())
                .offset(page.getOffset())
                .fetchResults();
        return new PageImpl<>(results.getResults(), page, results.getTotal());
    }


    @Override
    public Page<Comment> selectCommentByFeedIdAndParentCommentId(Long feedId, Long parentCommentId, Pageable page) {
        QueryResults<Comment> results = jpaQueryFactory.selectFrom(comment)
                .where(comment.feed.id.eq(feedId).and(comment.parent.id.eq(parentCommentId)))
                .orderBy(comment.id.desc())
                .limit(page.getPageSize())
                .offset(page.getOffset())
                .fetchResults();
        return new PageImpl<>(results.getResults(), page, results.getTotal());
    }

    @Override
    public Long selectCommentCountByFeedId(Long feedId) {
        Long count = jpaQueryFactory.select(comment.count())
                .from(comment)
                .where(comment.feed.id.eq(feedId))
                .fetchOne();
        return count;
    }
}

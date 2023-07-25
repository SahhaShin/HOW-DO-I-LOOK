package com.ssafy.howdoilook.domain.common.entity;

import lombok.Getter;
<<<<<<< HEAD
=======
import org.springframework.data.annotation.CreatedBy;
>>>>>>> 6dae50cb61c136db17f1417bb9e94fd836e934f7
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
<<<<<<< HEAD
public class BaseTimeEntity {
=======
public abstract class BaseTimeEntity {
>>>>>>> 6dae50cb61c136db17f1417bb9e94fd836e934f7

    @CreatedDate
    @Column(name ="created_date",updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "updated_date")
    private LocalDateTime modifiedDate;
}

package com.ssafy.howdoilook.domain.ootd.entity;

import com.ssafy.howdoilook.domain.common.entity.BaseTimeEntity;
import lombok.Cleanup;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Ootd extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ootd_no")
    private Long id;

}

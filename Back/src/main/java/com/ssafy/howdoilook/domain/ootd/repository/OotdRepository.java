package com.ssafy.howdoilook.domain.ootd.repository;

import com.ssafy.howdoilook.domain.ootd.entity.Ootd;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OotdRepository extends JpaRepository<Ootd, Long> {
}

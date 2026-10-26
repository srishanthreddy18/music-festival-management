package com.klef.soa.docker.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.klef.soa.docker.entity.MusicFestival;

public interface MusicFestivalRepository extends JpaRepository<MusicFestival, Long>{

}

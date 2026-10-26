package com.klef.soa.docker.service;
import java.util.List;
import com.klef.soa.docker.entity.MusicFestival;
public interface MusicFestivalService {

    MusicFestival addFestival(MusicFestival festival);

    List<MusicFestival> getAllFestivals();

    MusicFestival getFestivalById(Long id);

    MusicFestival updateFestival(Long id, MusicFestival festival);

    String deleteById(Long id);
}

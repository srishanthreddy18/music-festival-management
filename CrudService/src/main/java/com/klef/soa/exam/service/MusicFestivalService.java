package com.klef.soa.exam.service;

import java.util.List;

import com.klef.soa.exam.entiry.MusicFestival;

public interface MusicFestivalService  {
	 MusicFestival addFestival(MusicFestival festival);

	    List<MusicFestival> getAllFestivals();
	    String deleteById(Long id);
}

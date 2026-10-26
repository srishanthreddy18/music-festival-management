package com.klef.soa.docker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.klef.soa.docker.entity.MusicFestival;
import com.klef.soa.docker.service.MusicFestivalService;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class MusicFestivalController {

    private final MusicFestivalService service;

    @GetMapping("/")
    public String home() {
        return "Music Festival CRUD Service Running Successfully";
    }

    @PostMapping("/Add")
    public MusicFestival addFestival(@RequestBody MusicFestival festival) {
        return service.addFestival(festival);
    }

    @GetMapping("/DisplayAll")
    public List<MusicFestival> displayAllFestivals() {
        return service.getAllFestivals();
    }

    @GetMapping("/Display/{id}")
    public MusicFestival getFestivalById(@PathVariable Long id) {
        return service.getFestivalById(id);
    }

    @PutMapping("/Update/{id}")
    public MusicFestival updateFestival(
            @PathVariable Long id,
            @RequestBody MusicFestival festival) {

        return service.updateFestival(id, festival);
    }

    @DeleteMapping("/Delete/{id}")
    public String deleteFestival(@PathVariable Long id) {
        return service.deleteById(id);
    }
}
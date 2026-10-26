package com.klef.soa.docker.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class MusicFestivalRequest {

    @NotBlank(message = "Festival Name is required")
    private String festivalName;

    @NotBlank(message = "Venue is required")
    private String venue;

    @NotBlank(message = "Event Date is required")
    private String eventDate;

    @NotNull(message = "Ticket Price is required")
    @Positive(message = "Ticket Price must be positive")
    private Double ticketPrice;
}
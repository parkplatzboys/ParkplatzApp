package com.gfi.parkplatzapp.backend.persistence.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Buchung {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long buchungID;

    private Date datum;
    private Double tagespreis;
    @ManyToOne
    private Mitarbeiter mitarbeiter;
    @ManyToOne
    private Parkplatz parkplatz;
    
}
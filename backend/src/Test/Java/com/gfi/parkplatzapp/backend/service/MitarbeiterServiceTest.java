package com.gfi.parkplatzapp.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gfi.parkplatzapp.backend.persistence.entities.Mitarbeiter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import org.springframework.test.context.jdbc.SqlGroup;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.RequestEntity.post;

@WebMvcTest(controllers = MitarbeiterService.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(MockitoExtension.class)

class MitarbeiterServiceTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private MitarbeiterService mitarbeiterService;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getMitarbeiter_Equals_Vorname () throws Exception {
        assertEquals(mitarbeiterService.getMitarbeiter(1L).getVorname(), "Max");
    }

    @Test
    public void getKennzeichenForMitarbeiter_NotNull() throws Exception {
        Long id = 1L;
        assertNotNull(mitarbeiterService.getKennzeichenForMitarbeiter(id));
    }
}
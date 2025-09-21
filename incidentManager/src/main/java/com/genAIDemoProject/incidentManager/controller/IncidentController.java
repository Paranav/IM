package com.genAIDemoProject.incidentManager.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.genAIDemoProject.incidentManager.model.Incident;
import com.genAIDemoProject.incidentManager.service.IncidentService;

@RestController
@RequestMapping("/api/v1/incident")
public class IncidentController {
	
	@Autowired
	private IncidentService incidentService;
	
	@PostMapping("/save")
	public Incident saveIncident(@RequestBody Incident incident) {
		return incidentService.createIncident(incident.getText());
	}
	
	@PostMapping("/saveALL")
	public void saveIncident(@RequestBody List<Incident> incidents) {
		 incidentService.createIncident(incidents);
	}
	
	@GetMapping("/getAll")
	public List<Incident> getAllIncident() {
		return incidentService.getAllIncident();
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable(name = "id") Long id) {
		 incidentService.removeIncident(id);
	}
	
    @PostMapping("/query")
    public List<Incident> query(@RequestBody Map<String,String> body) {
        return incidentService.querySimilar(body.get("query"), 5);
    }

    @PostMapping("/ask")
    public Map<String,Object> ask(@RequestBody Map<String,String> body) {
        String answer = incidentService.ask(body.get("query"));
        List<Incident> matches = incidentService.querySimilar(body.get("query"), 5);
        return Map.of("answer", answer);
    }

}

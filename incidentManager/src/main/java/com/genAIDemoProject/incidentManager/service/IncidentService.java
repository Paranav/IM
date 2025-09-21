package com.genAIDemoProject.incidentManager.service;

import java.util.List;

import com.genAIDemoProject.incidentManager.model.Incident;

public interface IncidentService {
	
	public Incident saveIncident(Incident incident);
	
	public Incident createIncident(String text);

	public List<Incident> getAllIncident();
	
	public List<Incident> querySimilar(String query, int limit);
	
	public String ask(String query);

	public void createIncident(List<Incident> incidents);

	public void removeIncident(Long id);
}

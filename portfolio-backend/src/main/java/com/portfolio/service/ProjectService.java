package com.portfolio.service;

import com.portfolio.model.Project;
import com.portfolio.repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    private final ProjectRepository repository;

    public ProjectService(ProjectRepository repository) {
        this.repository = repository;
    }

    public List<Project> getAllProjects() {
        return repository.findAll();
    }

    public Optional<Project> getProjectById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Project createProject(Project project) {
        return repository.save(project);
    }

    @Transactional
    public Project updateProject(Long id, Project updatedProject) {
        return repository.findById(id)
                .map(p -> {
                    p.setTitle(updatedProject.getTitle());
                    p.setDescription(updatedProject.getDescription());
                    p.setProjectUrl(updatedProject.getProjectUrl());
                    p.setTags(updatedProject.getTags());
                    if (updatedProject.getImageData() != null) {
                        p.setImageData(updatedProject.getImageData());
                        p.setImageContentType(updatedProject.getImageContentType());
                    }
                    return repository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    @Transactional
    public void deleteProject(Long id) {
        repository.deleteById(id);
    }
}

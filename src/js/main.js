document.addEventListener('DOMContentLoaded', () => {
    const projectsContainer = document.getElementById('projects');

    fetch('./data/projects.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.classList.add('project');

                const titleElement = document.createElement('h3');
                titleElement.textContent = project.title;

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = project.description;

                const linkElement = document.createElement('a');
                linkElement.href = project.link;
                linkElement.textContent = 'View Project';
                linkElement.target = '_blank';

                projectElement.appendChild(titleElement);
                projectElement.appendChild(descriptionElement);
                projectElement.appendChild(linkElement);
                projectsContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error fetching project data:', error));
    
});
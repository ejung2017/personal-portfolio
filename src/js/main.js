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
    
    const projects = document.querySelectorAll('.project');
    let popup = document.querySelector('.popup');

    projects.forEach(project => {
        project.addEventListener('click', (e) => {
            // Prevent click from bubbling if inside the project
            e.stopPropagation();

            if (!popup) {
            popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `
                <span class="close-btn">&times;</span>
                <div class="popup-content"></div>
            `;
            document.body.appendChild(popup);

            popup.querySelector('.close-btn').addEventListener('click', () => {
                popup.style.display = 'none';
            });
            }

            const content = project.getAttribute('data-popup-content');
            popup.querySelector('.popup-content').textContent = content;
            popup.style.display = 'block';
        });
    });

    // Close popup when clicking outside
    document.addEventListener('click', (e) => {
        if (popup && !popup.contains(e.target) && !e.target.closest('.project')) {
            popup.style.display = 'none';
        }
    });
    const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = 90; // Match your header height + margin
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth' // Smooth scrolling
        });
      }
    });
  });

});
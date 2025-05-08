document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const buscarButton = document.getElementById('buscar');
  const resultadosDiv = document.getElementById('resultados');
  const avatarImg = document.getElementById('avatar');
  const nameSpan = document.getElementById('name');
  const bioSpan = document.getElementById('bio');
  const followersSpan = document.getElementById('followers');
  const followingSpan = document.getElementById('following');
  const publicReposSpan = document.getElementById('public_repos');
  const htmlUrlLink = document.getElementById('html_url');
  const locationSpan = document.getElementById('location');


  // Mostrar perfil falso de "Octopus Dev" al cargar la página
  avatarImg.src = 'https://avatars.githubusercontent.com/u/583231?v=4'; // Un avatar genérico de GitHub
  nameSpan.textContent = 'Octopus Dev';
  bioSpan.textContent = 'Desarrollador web entusiasta con muchos tentáculos para codificar.';
  followersSpan.textContent = '1000';
  followingSpan.textContent = '50';
  publicReposSpan.textContent = '20';
  htmlUrlLink.href = 'https://github.com/octocat'; // Un perfil de ejemplo
  htmlUrlLink.textContent = 'Ver perfil';
  resultadosDiv.style.display = 'block';

  buscarButton.addEventListener('click', () => {
      const username = usernameInput.value.trim();

      if (username) {
          buscarUsuario(username);
      } else {
          alert('Por favor, ingresa un nombre de usuario.');
      }
  });

  async function buscarUsuario(username) {
      const apiUrl = `https://api.github.com/users/${username}`;

      try {
          const response = await fetch(apiUrl);

          if (!response.ok) {
              if (response.status === 404) {
                  resultadosDiv.style.display = 'block';
                  resultadosDiv.innerHTML = '<p>Usuario no encontrado.</p>';
                  return;
              } else {
                  throw new Error(`Error al obtener los datos: ${response.status}`);
              }
          }

          const data = await response.json();

          avatarImg.src = data.avatar_url;
          nameSpan.textContent = data.name || 'No disponible';
          bioSpan.textContent = data.bio || 'No disponible';
          locationSpan.textContent = data.location || 'No disponible';
          followersSpan.textContent = data.followers;
          followingSpan.textContent = data.following;
          publicReposSpan.textContent = data.public_repos;
          htmlUrlLink.href = data.html_url;
          htmlUrlLink.textContent = 'Ver perfil';

          resultadosDiv.style.display = 'block';

      } catch (error) {
          console.error('Error:', error);
          resultadosDiv.style.display = 'block';
          resultadosDiv.innerHTML = '<p>Ocurrió un error al buscar el usuario.</p>';
      }
  }
});

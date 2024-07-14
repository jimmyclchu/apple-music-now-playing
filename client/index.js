document.addEventListener('DOMContentLoaded', () => {
  if (!window.MusicKit) {
    console.error('MusicKit is not defined');
    return;
  }

  console.log('MusicKit is loaded');

  const developerToken = process.env.DEVELOPER_TOKEN;

  MusicKit.configure({
    developerToken: developerToken,
    app: {
      name: 'Sumojimja',
      build: '1.0.0'
    }
  });

  const music = MusicKit.getInstance();

  if (!music) {
    console.error('Failed to initialize MusicKit instance');
    return;
  }

  document.getElementById('login').addEventListener('click', () => {
    music.authorize();
  });

  document.getElementById('checkAuth').addEventListener('click', () => {
    if (music.isAuthorized) {
      const token = music.musicUserToken;
      console.log('User is authorized:', token);
      document.getElementById('token').innerText = `User Token: ${token}`;

      fetch('https://api.music.apple.com/v1/me/library/playlists', {
        headers: {
          Authorization: `Bearer ${developerToken}`,
          'Music-User-Token': token,
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log('Playlists:', data);
      })
      .catch(error => {
        console.error('Failed to fetch playlists:', error);
      });
    } else {
      console.log('User is not authorized');
      document.getElementById('token').innerText = 'User is not authorized';
    }
  });
});
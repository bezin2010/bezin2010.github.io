document.addEventListener('DOMContentLoaded', function() {
  /* ----- Postagens ----- */
  const postForm = document.getElementById('postForm');
  const postsContainer = document.getElementById('postsContainer');
  let posts = JSON.parse(localStorage.getItem('posts')) || [];

  function displayPosts() {
    if (postsContainer) {
      postsContainer.innerHTML = '';
      posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        // Cabeçalho com nome de usuário e data/hora
        const header = document.createElement('div');
        header.className = 'post-header';
        header.innerHTML = `<strong>${post.username}</strong> - ${post.timestamp}`;
        // Área de mídia (imagem ou vídeo)
        const media = document.createElement('div');
        if (post.mediaType === 'image') {
          media.innerHTML = `<img src="${post.mediaData}" alt="Post image">`;
        } else if (post.mediaType === 'video') {
          media.innerHTML = `<video controls src="${post.mediaData}"></video>`;
        }
        // Legenda
        const caption = document.createElement('p');
        caption.textContent = post.caption;
        // Rodapé com botão de curtir
        const footer = document.createElement('div');
        footer.className = 'post-footer';
        const likeBtn = document.createElement('button');
        likeBtn.textContent = `Curtir (${post.likes})`;
        likeBtn.addEventListener('click', function() {
          posts[index].likes++;
          localStorage.setItem('posts', JSON.stringify(posts));
          displayPosts();
        });
        footer.appendChild(likeBtn);

        postElement.appendChild(header);
        postElement.appendChild(media);
        postElement.appendChild(caption);
        postElement.appendChild(footer);
        postsContainer.appendChild(postElement);
      });
    }
  }
  displayPosts();

  if (postForm) {
    postForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const mediaInput = document.getElementById('media');
      const caption = document.getElementById('caption').value;
      const file = mediaInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          const mediaData = evt.target.result;
          // Determina o tipo do arquivo
          const mediaType = file.type.startsWith('video') ? 'video' : 'image';
          const user = JSON.parse(localStorage.getItem('user'));
          const newPost = {
            username: user.username,
            timestamp: new Date().toLocaleString(),
            mediaData,
            mediaType,
            caption,
            likes: 0
          };
          posts.unshift(newPost);
          localStorage.setItem('posts', JSON.stringify(posts));
          displayPosts();
          postForm.reset();
        }
        reader.readAsDataURL(file);
      }
    });
  }

  /* ----- Notas das Matérias ----- */
  const noteForm = document.getElementById('noteForm');
  const notesContainer = document.getElementById('notesContainer');
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  function displayNotes() {
    if (notesContainer) {
      notesContainer.innerHTML = '';
      notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.textContent = `${note.subject}: ${note.grade}`;
        notesContainer.appendChild(noteDiv);
      });
    }
  }
  displayNotes();

  if (noteForm) {
    noteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const subject = document.getElementById('subject').value;
      const grade = document.getElementById('grade').value;
      const newNote = { subject, grade };
      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
      noteForm.reset();
    });
  }
});

document.getElementById('addPostIt').addEventListener('click', () => {
    const board = document.getElementById('board');
    
    const postIt = document.createElement('div');
    postIt.classList.add('post-it');
  
    // cor aleatória para o post-it
    const colors = ['yellow', 'pink', 'green', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    postIt.classList.add(randomColor);
  
    postIt.innerHTML = '<textarea></textarea>';
    
    // arrastar e soltar
    postIt.setAttribute('draggable', true);
    postIt.style.top = '100px';
    postIt.style.left = '100px';
    
    postIt.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', null); 
      postIt.classList.add('dragging');
    });
  
    postIt.addEventListener('dragend', (e) => {
      const newX = e.pageX - 75; 
      const newY = e.pageY - 75;
      postIt.style.left = `${newX}px`;
      postIt.style.top = `${newY}px`;
      postIt.classList.remove('dragging');
      
      // enviar atualização de posição para o backend
      const id = postIt.getAttribute('data-id') || Date.now(); 
      postIt.setAttribute('data-id', id);
      fetch(`/postit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position: { x: newX, y: newY },
        }),
      });
    });
  
    board.appendChild(postIt);
  });
  
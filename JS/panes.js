fetch('JS/JSON/panes.json')
  .then(res => res.json())
  .then(panes => {
    const contenedor = document.getElementById('contenedor-panes');

    panes.forEach((p, i) => {
      const div = document.createElement('div');
      div.classList.add('pan');

      // Si es el último y solo hay 1 en la última fila (resto % 3 === 1)
      if (i === panes.length - 1 && panes.length % 3 === 1) {
        div.classList.add('centrado-ultimo');
      }

      // Imagen con fallback
      const imagenSrc = p.imagenes?.imagen1 || 'Imagenes/pan/vacio.jpg';

      div.innerHTML = `
        <img src="${imagenSrc}" alt="${p.nombre}">
        <h2>${p.nombre}</h2>
        <p>${p.DescripcionBreve}</p>
        <div class="pan-footer">
          <a class="btn" href="index.html?id=${p.id}">Más información +</a>
        </div>
      `;

      contenedor.appendChild(div);
    });
  })
  .catch(err => {
    console.error('Error al cargar los panes: ', err);
  });

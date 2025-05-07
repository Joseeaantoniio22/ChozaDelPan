fetch('JS/JSON/dulces.json')
    .then(res => res.json())
    .then(dulces => {
        const contenedor = document.getElementById('contenedor-dulces');
        dulces.forEach((p, i) => {
            const div = document.createElement('div');
            div.classList.add('dulce');
            if (i === dulces.length - 1 && dulces.length % 3 === 1) {
                div.classList.add('centrado-ultimo');
            }
            
            div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}"> 
            <h2> ${p.nombre}</h2>
            <p>${p.DescripcionBreve}</p>
            <div class="dulce-footer">
            <a class="btn" href="dulce.html?id=${p.id}">Más información +</a>
            </div>
            `;
            contenedor.appendChild(div);
        });
    })

    .catch(err => {
        console.error('Error al cargar los dulces: ', err)
    });
// Obtiene el ID desde la URL
const params = new URLSearchParams(window.location.search);
const idPan = params.get('id');

fetch('../JS/JSON/panes.json')
  .then(res => res.json())
  .then(panes => {
    const pan = panes.find(p => p.id == idPan);
    if (!pan) {
        document.getElementById("detalle-pan").innerHTML = "<p>Pan no encontrado.</p>";
        return;
    }

    document.getElementById("detalle-Pan").innerHTML = `
        <h1>${pan.nombre}</h1>
        <img src="../${pan.imagenes.imagen1}" alt="${pan.nombre}">
        <p><strong>Descripción:</strong> ${pan.descripcion}</p>
        <h3>Detalles:</h3>
        <ul>
            <li><strong>Miga: </strong> ${pan.detalles.miga}</li>
            <li><strong>Sabor:</strong> ${pan.detalles.sabor}</li>
            <li><strong>Ideal para:</strong> ${pan.detalles.ideal_para}</li>
            <li><strong>Conservación: </strong> ${pan.detalles.conservación}</li>
        </ul>
        <h4>Ingredientes principales:</h4>
        <ul>
            ${pan.detalles.ingredientes_principales.map(ing => `<li>${ing}</li>`).join("")}
        </ul>
        <a href="../nuestrospanes.html" class="btn-volver">← Volver al catálogo</a>
    `;
})
.catch(err => {
    console.error("Error al cargar el detalle del :", err);
    document.getElementById("detalle-pan").innerHTML = "<p>Error al cargar los datos.</p>";
});

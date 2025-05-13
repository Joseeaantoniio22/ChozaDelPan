document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    fetch('/JS/JSON/dulces.json')
        .then(res => res.json())
        .then(dulces => {
            const dulce = dulces.find(d => d.id === id);
            if (!dulce) {
                document.getElementById("detalle-dulce").innerHTML = "<p>Dulce no encontrado.</p>";
                return;
            }

            // Sección proceso (si existe)
            let procesoHTML = "";
                if (dulce.proceso) {
                    procesoHTML = `
                        <h3>Proceso de elaboración</h3>
                        <div class="proceso-imagenes">
                            ${dulce.proceso.imagen1 ? `
                                <div class="paso">
                                    <p class="titulo-paso">Paso 1</p>
                                    <img src="../${dulce.proceso.imagen1}" alt="Paso 1">
                                </div>` : ""
                            }
                            ${dulce.proceso.imagen2 ? `
                                <div class="paso">
                                    <p class="titulo-paso">Paso 2</p>
                                    <img src="../${dulce.proceso.imagen2}" alt="Paso 2">
                                </div>` : ""
                            }
                            ${dulce.proceso.imagen3 ? `
                                <div class="paso">
                                    <p class="titulo-paso">Paso 3</p>
                                    <img src="../${dulce.proceso.imagen3}" alt="Paso 3">
                                </div>` : ""
                            }
                        </div>
                    `;
                }



            // HTML final del detalle
            document.getElementById("detalle-dulce").innerHTML = `
                <h1>${dulce.nombre}</h1>
                <img src="../${dulce.imagen}" alt="${dulce.nombre}">
                <p><strong>Descripción:</strong> ${dulce.descripcion}</p>

                <h3>Detalles</h3>
                <ul>
                    <li><strong>Textura:</strong> ${dulce.detalles.textura}</li>
                    <li><strong>Sabor:</strong> ${dulce.detalles.sabor}</li>
                    <li><strong>Ideal para:</strong> ${dulce.detalles.ideal_para}</li>
                </ul>

                <h4>Ingredientes principales</h4>
               <ul>
                    ${dulce.detalles.ingredientes_principales.map(ing => `<li>${ing}</li>`).join("")}
                </ul>

                ${procesoHTML}

                <a href="../productos.html" class="btn-volver">← Volver al catálogo</a>
            `;
        })
        .catch(err => {
            console.error("Error al cargar el detalle del dulce:", err);
            document.getElementById("detalle-dulce").innerHTML = "<p>Error al cargar los datos.</p>";
        });
});

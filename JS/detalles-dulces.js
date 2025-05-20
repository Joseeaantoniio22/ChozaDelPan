document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    fetch('../JS/JSON/dulces.json')
        .then(res => {
            console.log("Respuesta del servidor:", res);
            return res.json();
        })
        .then(dulces => {
            const dulce = dulces.find(d => d.id === id);
            console.log("Dulce encontrado:", dulce);

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


            // Generar HTML de alérgenos de forma dinámica y segura
            const alergenosHTML = Object.entries(dulce.alergenos)
                .filter(([nombre, ruta]) => ruta) // solo mostrar si hay imagen
                .map(([nombre, ruta]) => `
                    <div class="alergeno">
                    <img src="../${ruta}" alt="${nombre}" title="${nombre}">
                    <span>${nombre.charAt(0).toUpperCase() + nombre.slice(1)}</span>
                    </div>
                `).join("");




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

                <h3>Ingredientes principales</h3>
               <ul>
                    ${dulce.detalles.ingredientes_principales.map(ing => `<li>${ing}</li>`).join("")}
                </ul>

                ${procesoHTML}

                <h3>Alérgenos</h3>
                <div class="alergenos">
                    ${alergenosHTML || "<p>Sin alérgenos declarados.</p>"}
                </div>


                <a href="../productos.html" class="btn-volver">← Volver al catálogo</a>
            `;
        })
        .catch(err => {
            console.error("Error al cargar el detalle del dulce:", err);
            document.getElementById("detalle-dulce").innerHTML = "<p>Error al cargar los datos.</p>";
        });
});

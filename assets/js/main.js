// CREAR CLASE PIZZA
class Pizza {
    // crear constructor
    constructor(tipo = "xl", precio = 15000) {
        this.tipo = tipo;
        this.ingredientes = [];
        this.ingredientesExtras = [];
        this.precio = precio;
        this.precioFinal = precio; // Agrego esta propiedad para mantener el control del precio final
        this.propina = 1000; // Propina por defecto
    }

    // AGREGAR INGREDIENTES
    agregarIngredientes(ingrediente) {
        // validar si hay 3 ingredientes
        if (this.ingredientes.length < 3) {
            // pasar el ingrediente al array ingredientes
            this.ingredientes.push(ingrediente);
        } else {
            // pasaremos el ingrediente al array de ingredientes extras
            this.ingredientesExtras.push(ingrediente);
            // agregar a precio final
            this.precioFinal += 800; 
        }
        this.actualizarVistaIngredientes();
    }

    // ELIMINAR INGREDIENTES
    eliminarIngredientes(ingrediente) {
        if (this.ingredientes.includes(ingrediente)) {
            this.ingredientes = this.ingredientes.filter(ing => ing !== ingrediente);
        } else if (this.ingredientesExtras.includes(ingrediente)) {
            this.ingredientesExtras = this.ingredientesExtras.filter(ing => ing !== ingrediente);
            this.precioFinal -= 800;
        }
        this.actualizarVistaIngredientes();
    }

    // ACTUALIZAR VISTA DE INGREDIENTES
    actualizarVistaIngredientes() {
        document.getElementById('ingredientes-seleccionados').textContent = this.ingredientes.join(', ');
        document.getElementById('ingredientes-extras').textContent = this.ingredientesExtras.join(', ');
    }

    // CALCULAR TOTAL
    calcularTotal() {
        return this.precioFinal + this.propina; // Sumamos la propina al total final
    }

    // MOSTRAR RESUMEN DEL PEDIDO
    mostrarResumen() {
        const totalFinal = this.calcularTotal();
        const resumen = `
            <h2>Tipo pizza: ${this.tipo}</h2> 
            <p>Ingredientes:</p>
            <ul>${this.ingredientes.map(ing => `<li>${ing}</li>`).join('')}</ul>
            <p>Subtotal: $${this.precio}</p>
            <p>Ingredientes extras:</p>
            <ul>${this.ingredientesExtras.map(ing => `<li>${ing}</li>`).join('')}</ul>
            <p>Total de ingredientes extras: $${this.ingredientesExtras.length * 800}</p>
            <p>Propina: $${this.propina}</p>
            <p>Total: $${totalFinal}</p>
        `;
        document.getElementById('resumen-pedido').innerHTML = resumen;
    }

    // ACTUALIZAR PROPINA
    actualizarPropina(valorPropina) {
        this.propina = valorPropina;
        this.mostrarResumen();
    }
}

// CREAR EL OBJETO PÌZZA
const pizza = new Pizza('xl');

const listaIngredientes = document.querySelectorAll('.form-check-input');

listaIngredientes.forEach((ingre) => {
    // para revisar cada ingrediente si esta seleccionado
    ingre.addEventListener('change', function () {
        if (this.checked) {
            // si esta seleccionado, agregar el ingrediente al objeto
            pizza.agregarIngredientes(this.value);
        } else {
            // si se deselecciona, eliminar el ingrediente del objeto
            pizza.eliminarIngredientes(this.value);
        }
        // llamamos a la función de mostrar resumen
        pizza.mostrarResumen();
    });
});

// PROPINA
// escuchamos si hay cambios en el input propina
document.getElementById('propina').addEventListener('input', function () {
    // guardamos el valor del input
    let propina = parseInt(this.value) || 1000; // mil pesos si no hay propina
    pizza.actualizarPropina(propina); // Actualizamos la propina en el objeto pizza
});

// ENVIAR EL PEDIDO
function enviarPedido() {
    const total = pizza.calcularTotal();

    // validar que la pizza tenga ingredientes:
    if (pizza.ingredientes.length > 0) {
        alert(`Tu pedido ha sido realizado. Total: $${total}`);
    } else {
        alert('Debes seleccionar al menos un ingrediente para tu pedido.');
    }
}

// Modificar la función para seleccionar una pizza del menú
document.querySelectorAll('#menu .card').forEach((card, index) => {
    card.addEventListener('click', () => {
        // Reiniciar ingredientes y precio antes de seleccionar una nueva pizza
        pizza.ingredientes = [];
        pizza.ingredientesExtras = [];
        pizza.precio = 15000; // Reiniciar el precio base

        // Asignar ingredientes predefinidos según la pizza seleccionada
        const ingredientesPizza = [
            // Pizza 1
            ['mozzarella', 'carne', 'pollo'],
            
            // Pizza 2
            ['tocino', 'mozzarella', 'champiñon'],
            
            // Pizza 3
            ['cebolla', 'piña', 'pimenton'],
            
            // Pizza 4
            ['jamón', 'aceitunas', 'albahaca'],
            
            // Pizza 5
            ['berenjena', 'queso_feta', 'espinacas'],
            
            // Pizza 6
            ['chorizo', 'carne', 'mozzarella'],
            
            // Pizza 7
            ['pimiento', 'champiñon', 'tocino'],
            
            // Pizza 8
            ['pollo', 'pimenton', 'cebolla']
        ];
        

        const seleccion = ingredientesPizza[index];
        
        // Desmarcar todos los checkboxes
        document.querySelectorAll('.form-check-input').forEach((input) => {
            input.checked = false;
        });

        // Marcar los ingredientes de la pizza seleccionada
        seleccion.forEach((ingre) => {
            // Obtener el checkbox del ingrediente
            const checkbox = document.querySelector(`.form-check-input[value="${ingre}"]`);

            // Verificar si el checkbox existe
            if (checkbox) {
                checkbox.checked = true;
                pizza.agregarIngredientes(ingre);
            } else {
                console.error(`No se encontró un checkbox para el ingrediente: ${ingre}`);
            }
        });

        // Mostrar el resumen actualizado
        pizza.mostrarResumen();
    });
});

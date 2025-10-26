// Simulador de préstamo personal o hipotecario


//  Constantes globales
const IVA = 0.21;
const PRESTAMOS = [
  { tipo: "Personal", tasa: 0.45 },
  { tipo: "Hipotecario", tasa: 0.25 },
  { tipo: "Automotor", tasa: 0.35 },
];

// 🔹 Variables de control
let historialPrestamos = [];
let totalSimulaciones = 0;

// FUNCIONES

// Capturar los datos del préstamo
function getLoanData() {
  console.log("Iniciando captura de datos del préstamo...");

  const nombre = prompt("Ingrese su nombre: ");
  if (nombre === null) return null;

  const monto = parseFloat(prompt("Ingrese el monto del préstamo ($):", "100000"));
  if (isNaN(monto) || monto <= 0) {
    alert("Monto inválido. Intente nuevamente.");
    return null;
  }

  const cuotas = parseInt(prompt("Ingrese cantidad de cuotas (por ejemplo 12, 24, 36):", "12"));
  if (isNaN(cuotas) || cuotas <= 0) {
    alert("Cantidad de cuotas inválida. Intente nuevamente.");
    return null;
  }

  // Mostrar tipos disponibles
  console.log("Tipos de préstamo disponibles:");
  PRESTAMOS.forEach((p, index) =>
    console.log(`${index + 1}. ${p.tipo} - Tasa anual: ${(p.tasa * 100).toFixed(1)}%`)
  );

  const tipoElegido = parseInt(prompt("Seleccione tipo de préstamo (1=Personal, 2=Hipotecario, 3=Automotor):", "1"));
  if (isNaN(tipoElegido) || tipoElegido < 1 || tipoElegido > PRESTAMOS.length) {
    alert("Tipo inválido. Se usará 'Personal' por defecto.");
  }

  const prestamo = PRESTAMOS[tipoElegido - 1] || PRESTAMOS[0];

  return {
    nombre: nombre.trim(),
    monto,
    cuotas,
    tipo: prestamo.tipo,
    tasa: prestamo.tasa,
  };
}

// Calcular préstamo
function calculateLoan(datos) {
  console.log("Calculando préstamo...");

  // Fórmula simple de interés compuesto anual (aproximada)
  const interesTotal = datos.monto * datos.tasa;
  const subtotal = datos.monto + interesTotal;
  const iva = subtotal * IVA;
  const total = subtotal + iva;
  const cuotaMensual = total / datos.cuotas;

  return {
    interesTotal,
    subtotal,
    iva,
    total,
    cuotaMensual,
  };
}

// Mostrar resumen al usuario
function showSummary(datos, resultado) {
  const mensaje =
    "Simulación completada:\n" +
    "-----------------------------\n" +
    "Cliente: " + datos.nombre + "\n" +
    "Tipo de préstamo: " + datos.tipo + "\n" +
    "Monto solicitado: $" + datos.monto.toFixed(2) + "\n" +
    "Cuotas: " + datos.cuotas + "\n" +
    "Interés total: $" + resultado.interesTotal.toFixed(2) + "\n" +
    "IVA: $" + resultado.iva.toFixed(2) + "\n" +
    "Monto total a devolver: $" + resultado.total.toFixed(2) + "\n" +
    "Cuota mensual: $" + resultado.cuotaMensual.toFixed(2) + "\n" +
    "-----------------------------";

  console.log(mensaje);
  alert(
    `Hola ${datos.nombre}! Tu préstamo ${datos.tipo} tendrá ${datos.cuotas} cuotas de $${resultado.cuotaMensual.toFixed(
      2
    )} (Total: $${resultado.total.toFixed(2)})`
  );
}

//  Ejecutar el simulador
function runSimulation() {
  console.log("Bienvenido al simulador de préstamos.");

  let continuar = true;

  while (continuar) {
    const datos = getLoanData();
    if (!datos) {
      continuar = confirm("¿Desea intentar nuevamente?");
      continue;
    }

    const resultado = calculateLoan(datos);
    showSummary(datos, resultado);

    historialPrestamos.push({ datos, resultado });
    totalSimulaciones++;

    continuar = confirm("¿Desea simular otro préstamo?");
  }

  console.log("Simulador finalizado.");
  console.log("Total de simulaciones realizadas:", totalSimulaciones);
  console.table(historialPrestamos);
}

//  Ejecutar automáticamente al cargar el script
runSimulation();

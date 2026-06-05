import { useState, useEffect } from 'react';

function App() {
  const [tarea, setTarea] = useState('');

  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem('tareas');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  function agregarTarea() {
    if (tarea.trim() === '') return;

    setTareas([...tareas, { texto: tarea, completada: false }]);
    setTarea('');
  }

  function eliminarTarea(indexEliminar) {
    const nuevasTareas = tareas.filter((t, index) => index !== indexEliminar);
    setTareas(nuevasTareas);
  }

  function completarTarea(indexCompletar) {
    const nuevasTareas = tareas.map((t, index) => {
      if (index === indexCompletar) {
        return { ...t, completada: !t.completada };
      }

      return t;
    });

    setTareas(nuevasTareas);
  }

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  return (
    <div>
      <h1>To-Do App</h1>

      <input
        type="text"
        placeholder="Escribí una tarea..."
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
      />

      <button onClick={agregarTarea}>Agregar</button>

      <ul>
        {tareas.map((t, index) => (
          <li key={index}>
            <span
              onClick={() => completarTarea(index)}
              style={{
                textDecoration: t.completada ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
            >
              {t.texto}
            </span>

            <button onClick={() => eliminarTarea(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

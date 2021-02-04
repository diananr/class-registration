# Foris - Registro de clases

Este proyecto es un submódulo de apoyo a las personas que trabajan en inscribir asignaturas a estudiantes universitarios. Para ello se hace mención a dos entidades importantes, los administradores y los estudiantes.

## Figma ✨
  - [Mockup](https://www.figma.com/file/Awx8CZF9bOzo63ambdAnki/Test-front?node-id=11%3A119)
  - [Prototipo](https://www.figma.com/proto/Awx8CZF9bOzo63ambdAnki/Test-front?node-id=63%3A987&viewport=57%2C23%2C0.20488262176513672&scaling=scale-down)

## Pasos para levantar el proyecto 🚀

1. Instalar globalmente Angular: `npm install -g @angular/cli`
2. Clonar el repositorio: `git clone https://github.com/diananr/class-registration.git`
3. Acceder a la carpeta del proyecto: `cd class-registration`
5. Instalar las dependencias: `npm install`
5. Finalmente, para levantarlo `ng serve --open` y automáticamente se abrirá una pestaña en el navegador apuntando a `http://localhost:4200/`


## Arquitectura 🛠️

Cuando se trabaja con Angular suelen estar presentes los módulos Core y Shared, sin embargo al ser un proyecto pequeño decidí no añadir esta última porque van módulos reutilizables, pipes, directivas y componentes compartidos lo cual no fue necesario.

  - Core: Esta carpeta contiene archivos que sólo necesitamos cargarlos una vez y nos van a ser útiles para todo el proyecto. Aquí suelen estar los incerterceptos, guards, services, constanst, enums, utils.

  - Views: Como es un proyecto pequeño decidí sólo tener un módulo donde pueda alojar las dos vistas: dashboard y student-detail.
    - Dashboard: Aquí se encuentra la lista de estudiantes y el resumen del administrador.

    - Student-Detail: Esta vista contiene tres secciones: el perfil del estudiante, el formulario del estudiante y la lista de cursos del estudiante. Como estas contenian su propia lógica, opté por separarlas en componentes y manejar la comunicación mediante Inputs y Outputs.


## Consideraciones 📋

- Cuando el botón primario (que tiene el color dark-blue) está deshabilitado es de color light-blue.
- Para guardar un número teléfono se tiene que incluir el código del país, ya que tiene la validación por Regex.

## Siguientes pasos ➡️

- El archivo element.scss lo dividiría en archivos específicos como card.scss, button.scss, etc.
- Crear mappers para no tener camelCase y snake_case en el proyecto.
- Mostrar al usuario cuando los inputs no son válidos.


## Autora ⌨️

- Diana Navarro :)



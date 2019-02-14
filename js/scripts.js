'use strict';


// Inicamos el documento

// Funciones realizadas con Jquery -v 3.3.1


// Creamos variable gloval y la llamamos a la lista de proyecto del sidebar

const lista = $('ul#proyectos');  
 
$(document).ready(function(){
    actualizaProgreso();
});



$('.crear-proyecto a').click((e) => {
    e.preventDefault();
    // Creamos el nuevo elemento con sus atributos

    // Valida si tiene un input ya generado, en caso contrrario lo crea
    var numerop = $('.nuevoProyecto').length    

    if(numerop === 0){
        var nuevoProyectoLista = $('<li>',{
            'html': '<input class="nuevoProyecto" id="nuevo" placeholder="Nombre del proyecto">',
        });
    
        // Agregamos a la lista existente de proyectos
    
        lista.append(nuevoProyectoLista);
    
        // Activa el foco en el elemento creado
    
        $('input#nuevo').focus();
    
    
        // Creamos una variable para el input del nuevo proyecto y realizar eventos KeyPress
    
        var newInput = $('#nuevo');
    
        newInput.keypress((e) => { 
            if(newInput.value !== ''){
                if(e.key === 'Enter' || e.whick === 13){
                    SaveProyect(newInput.val());
                    nuevoProyectoLista.remove();
                }
            }
        });
    }
     // Activa el foco en el elemento ya creado
    
     $('input#nuevo').focus();
    
});

//     Evento para crear una nueva tarea

$('.nueva-tarea').click((e) => { 
    // para no refrescar pantalla

    e.preventDefault();

    var tarea = $('.nombre-tarea').val();
    var id = $('#idproyecto').val();
    
    // Objeto FormData
    var datas = new FormData();

    // Agregamos valores

    datas.append('tarea', tarea);
    datas.append('tipo', 'crear');
    datas.append('id', id);

    // Validar campo vacio
    if(tarea !== ''){
        $.ajax({
            type: 'POST',
            url: 'inc/models/agregar-tarea',
            data: datas,
            processData: false,
            contentType: false,
            async: true,
            success: (r) => {
                var resp = JSON.parse(r);
                if(resp.status === "Correcto"){
                    if(resp.type === "crear"){
                        const listaTareas = $('h1.lista-vacia').length;
                        var listastareas = $('.listadoVacio');
                           if(listaTareas === 1){
                            startTareas(resp.nombre,resp.message);
                           }else if(listaTareas === 0 || listastareas.length === 1){  
                                listastareas.remove();
                                //  Crear elementos de lista en las tareas
                                var ListaTarea = $('<li>',{
                                    'id': resp.message,
                                    'class': 'tarea'
                                }).append(
                                    $('<p>',{
                                        'text': resp.nombre
                                    })
                                ).append(
                                    $('<div>',{
                                        'class': 'acciones'
                                    }).append(
                                        $('<i>',{
                                            'class': 'valid far fa-check-circle'
                                        })
                                    ).append(
                                        $('<i>',{
                                            'class': 'delete fas fa-trash'
                                        })
                                    )
                                );
                                //    Llamada a lista
                                const listado = $('.listado-pendientes ul');
                                
                                // Añadir elemento a lista

                                listado.append(ListaTarea);
                           }

                         

                        $('.nombre-tarea').val('');
                        actualizaProgreso();
                    }
                }else{
                    swal.fire('Aviso','No se agrego la tarea','error');
                }
            },error: (e) => {
                console.log(e);
                
            }
        });

    }
    
});


$('.listado-pendientes').click((e) =>{
    e.preventDefault();
    if(e.target.classList.contains('fa-check-circle')){
        e.target.classList.forEach(element => {
            if(element === 'completo'){
                e.target.classList.remove('completo');
            }else{
                e.target.classList.add('completo');            
            }
        });
        statusTarea(e.target,1,"actualizar");    
    }
    
    if(e.target.classList.contains('fa-trash')){
        statusTarea(e.target,null,"borrar");
    }
    
});

// Funcion de barra de progreso

function actualizaProgreso(){
    var listadoTareas = $('li.tarea').length;
    var tareasCompletadas = $('i.completo').length;
    var porcentaje = $('#barra-progreso');
    const avance = Math.round((tareasCompletadas / listadoTareas) * 100);
    porcentaje.css("width",avance+'%');
    if(isNaN(avance)){
        porcentaje.css("width",0+'%');
    }
    
}

// Funcion de guardar proyecto y almacenar en bd

function SaveProyect(nombre){
    
    // Datos del formulario

    var formData = new FormData();
    formData.append('proyecto', nombre);
    formData.append('tipo', 'crear');


    // Conexion a Ajax

    $.ajax({
        url: 'inc/models/modelo-proyecto',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        async: true,
        success: (resp) => {
            var r = JSON.parse(resp);
            if(r.status === "Correcto"){
                if(r.type === "crear"){
                    // Crear elemento para lista Proyectos
                    
                    var nuevoProyectoLista = $('<li>',{
                        'html': "<a href='index?proyect="+r.id+"' id='"+r.message+"' >"+r.nombre+"</a>"
                    });
                    
                    // // Agregar a la lista
                    
                    lista.append(nuevoProyectoLista);  

                    window.location.href = 'index?proyect='+r.id;
                }
            }
        },
        error: (e) =>{
            swal.fire('Error','Hubo un error '+e,'error');
        } 
    });
}
// Crea la plantilla para nuevas tareas en dado caso que no existan

function startTareas(nombretarea,id){
    if($('.lista-vacia').length === 1){
        var main = $('.contenido-principal');

        var contenedor = $('<h2>',{
            'text': 'Listado de tareas'
        });
        var listadoT = $('<div>',{
              'class': 'listado-pendientes'  
            }).append(
                $('<ul>').append(
                    $('<li>',{
                        'html': "<p>"+nombretarea+"</p>",
                        'id': id,
                        'class': 'tarea'
                    }).append(
                        $('<div>',{
                            'class': 'acciones'
                        }).append(
                            $('<i>',{
                                'class': 'valid far fa-check-circle'
                            })
                        ).append(
                            $('<i>',{
                                'class': 'delete fas fa-trash'
                            })
                        )
                    )
                )
            );
        
        var tituloBarra = $('<h2>',{
            'text': 'Avanze del proyecto'
        });                 
        var divBarra = $('<div>',{
            'id': 'barra-avance',
            'class': 'barra-avance'
        }).append(
            $('<div>',{
                'id': 'barra-progreso',
                'class': 'barra-progreso'
            })
        );   
        main.append(contenedor);
        main.append(listadoT);
        main.append(tituloBarra);
        main.append(divBarra);
        $('.lista-vacia').remove();
    }
}

// Define el status de las tareas para actualizar o borrar

function statusTarea(tarea,estado,accion){
        var id = tarea.parentElement.parentElement.id;
        var tarea = tarea.parentElement.parentElement;

        var data = new FormData();
        data.append('id',id);
        data.append('tipo',accion);
        data.append('status', estado);

        if (accion === 'actualizar') {
            var data = new FormData();
            data.append('id',id);
            data.append('tipo',accion);
            data.append('status', estado);
            $.ajax({
                type: 'POST',
                url: 'inc/models/agregar-tarea',
                data: data,
                processData: false,
                contentType: false,
                success: function (response) {
                    actualizaProgreso();
                }
            });
        }else{
            var data = new FormData();
            data.append('id',id);
            data.append('tipo',accion);
            Swal.fire({
                title: '¿Estás segura(o)?',
                text: "Deseas eliminar la tarea",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!',
                cancelButtonText: 'Cancelar'
            }).then((res) =>{
                if (res.value) {
                    $.ajax({
                        type: 'POST',
                        url: 'inc/models/agregar-tarea',
                        data: data,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                            var resp = JSON.parse(response);
                            if(resp.status === "Correcto"){  
                                tarea.remove();
                                swal.fire(
                                    'Eliminado!',
                                    'La tarea se elimino correctamente',
                                    'success'
                                ).then((e) => {
                                    var listadoRestante = $('li.tarea');                           
                                    if(e){
                                        if(listadoRestante.length === 0){      
                                            tarea.remove();          
                                            $('.listado-pendientes ul').append("<h3 class='listadoVacio'>No existen tareas en el proyecto</h3>");
                                        }
                                        actualizaProgreso();
                                    }
                                });
                            }
                        }
                    });
                }
            });

           
        }
        
                   
    
        //     // Carga
    
        //     xhr.onload = function(){
        //         if(this.status === 500){
        //             console.log(JSON.parse(xhr.responseText));
        //         }else if(this.status === 404){
        //             console.log(JSON.parse(xhr.responseText));
        //         }else{
        //             actualizaProgreso();
        //         }
        //     }
        //     // Envio request
    
        //     xhr.send(data);
        // }else if(accion === "borrar"){
        //     Swal.fire({
        //         title: '¿Estás segura(o)?',
        //         text: "Deseas eliminar la tarea",
        //         type: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: 'Si, eliminar!',
        //         cancelButtonText: 'Cancelar'
        //       }).then((result) => {
        //         if (result.value) {
    
        //         // Borrar de BD
        //         const data = new FormData();
    
        //         // Llamado a Ajax
        
        //         data.append('id',id);
        //         data.append('tipo',accion);
    
        //         // Carga
    
        //         xhr.onload = function(){
        //             if(this.status === 500){
        //                 console.log(JSON.parse(xhr.responseText));
        //             }else if(this.status === 404){
        //                 console.log(JSON.parse(xhr.responseText));
        //             }else{
        //                 var resp = JSON.parse(xhr.responseText);
        //                 if(resp.status === "Correcto"){     
        //                     // Borrar de"html"  
        //                     const listado = document.querySelector('.listado-pendientes ul');
        //                     listado.removeChild(tarea);
        //                     Swal.fire(
        //                         'Eliminado!',
        //                         'Tarea eliminada.',
        //                         'success'
        //                     ).then((r) => {
        //                         if(r){
        //                             const listadoRestante = document.querySelectorAll('li.tarea');
        //                             if(listadoRestante.length === 0){                
        //                                 document.querySelector('.listado-pendientes ul').innerHTML = "<h3>No existen tareas en el proyecto</h3>";
        //                             }
        //                             actualizaProgreso();
        //                         }
                                
        //                     });
        //                 }
        //             }
        //         }
        //         // Envio request
    
        //         xhr.send(data);
        //         }
        //       });
        // }
}




// Funciones hechas con JS nativo


// Iniciamos la funcion

// eventListener();

// // Llamamos a la lista de proyecto del sidebar

// const lista = document.querySelector('ul#proyectos');

// // Creamos la funcion para crear nuevos proyectos

// function eventListener(){
//     document.addEventListener('DOMContentLoaded', () => {
//         actualizaProgreso();
//     });

//     document.querySelector('.crear-proyecto a').addEventListener('click', (e) =>{
//         e.preventDefault();
    
//         // Crear input para nuevo proyecto

//     //     nuevoProyecto.innerHTML = `
//     //     <label class="field a-field a-field_a1 page__field">
//     //     <input class="nuevoProyecto" id="nuevo" placeholder="Nombre del proyecto">
//     //     </label>
//     // `;

//         const nuevoProyecto = document.createElement('li');
//         nuevoProyecto.innerHTML = '<input class="nuevoProyecto" id="nuevo" placeholder="Nombre del proyecto">';
        
//         // nuevoProyecto.style.borderBottom = "#d1c4e9"
//         lista.appendChild(nuevoProyecto);
//         var newInput = document.querySelector('#nuevo');

//         newInput.addEventListener('keypress', (e) =>{
//             if(newInput.value !== ''){
//                 if(e.key === 'Enter' || e.whick === 13){
//                     SaveProyect(newInput.value);
//                     lista.removeChild(nuevoProyecto);
//                 }
//             }
            
//         });
        
//     });

//     // Evento para crear una nueva tarea
//     document.querySelector('.nueva-tarea').addEventListener('click', (e) =>{
//         e.preventDefault();


//         var tarea = document.querySelector('.nombre-tarea').value;
        
//         // Validar campo si es vacio
//         if(tarea !== ''){
//             const xhr = new XMLHttpRequest();   
//             var data = new FormData();
//             var id = document.querySelector('#idproyecto').value;
            
//             data.append('tarea', tarea);
//             data.append('tipo', 'crear');
//             data.append('id', id);


//             xhr.open('POST','inc/models/agregar-tarea.php' ,true);

//             xhr.onload = function(){
//                 if(this.status === 500){
//                     console.log(JSON.parse(xhr.responseText));
//                 }else if(this.status === 404){
//                     console.log(JSON.parse(xhr.responseText));
//                 }else{
//                    var resp = JSON.parse(xhr.responseText);
//                    if(resp.status === "Correcto"){
//                         if(resp.type === "crear"){

//                            const listaTareas = document.querySelectorAll('.lista-vacia');
//                            if(listaTareas.length > 0){
//                                document.querySelector('.lista-vacia').remove();
//                            }
                           
//                             // Crear elemento

//                             var nueva = document.createElement('li');
//                             // Asignar id

//                             nueva.id = resp.message;
                            
//                             // Asignar clase

//                             nueva.classList.add('tarea');
                            
//                             // Construir template

//                             nueva.innerHTML = `
//                                 <p>${resp.nombre} </p>
//                                 <div class="acciones">
//                                     <i class="far fa-check-circle"></i>
//                                     <i class="fas fa-trash"></i>
//                                 </div>
//                             `;


//                             // Añadir template a lista

//                             const listado = document.querySelector('.listado-pendientes ul');

//                             listado.appendChild(nueva);

//                             document.querySelector('.agregar-tarea').reset();
//                             actualizaProgreso();
//                         }
//                    }else{
//                         swal.fire('Error','Hubo un error','error');
//                    }
                    
//                 }
//             }

//             xhr.send(data);
//         }
//     });

//     document.querySelector('.listado-pendientes').addEventListener('click', (e) => {
//         e.preventDefault();

//         if(e.target.classList.contains('fa-check-circle')){
            
//             if(e.target.classList.contains('completo')){
//                 e.target.classList.remove('completo');
//                 statusTarea(e.target,0,"actualizar");
//             }else{
//                 e.target.classList.add('completo');
//                 statusTarea(e.target,1,"actualizar");
//             }
            
//         }
        
//         if(e.target.classList.contains('fa-trash')){
//             statusTarea(e.target,null,"borrar");
//         }
        

//         // if(e.target.classList.value === 'far  '){
//         //     console.log('Hiciste click dentro de circulo');
//         // }else if(e.target.classList.value === 'fas fa-trash'){
//         //     console.log('Hiciste click dentro de basura');
//         // }
        
        
//     });
// }


// function SaveProyect(nombre){
//     // Llamado a Ajax

//     const xhr = new XMLHttpRequest();

//     // Datos del formulario

//     var data = new FormData();
//     data.append('proyecto', nombre);
//     data.append('tipo', 'crear');
    

//     // Abrir la conexion

//     xhr.open('POST', './inc/models/modelo-proyecto.php', true);


//     // Carga

//     xhr.onload = function(){
//         if(this.status === 500){
//             console.log(JSON.parse(xhr.responseText));
//         }else if(this.status === 404){
//             console.log(JSON.parse(xhr.responseText));
//         }else{
//            var resp = JSON.parse(xhr.responseText);

//             // Comprobacion de repuesta


//             if(resp.status === "Correcto"){
//                 if(resp.type === "crear"){
//                     const nuevoProyecto = document.createElement('li');
//                     nuevoProyecto.innerHTML = `
//                         <a href="index?response=${resp.message}" id="${resp.message}">
//                             ${resp.nombre}
//                         </a>
//                     `;
//                     // Agregar a la lista
//                     lista.appendChild(nuevoProyecto);  
//                 }
//             }else{
//                 swal.fire('Error','Hubo un error','error');
//             }


//         }
//     }
//     // Envio request

//     xhr.send(data);
// }


// function statusTarea(tarea,estado,accion){
//     var id = tarea.parentElement.parentElement.id;
//     var tarea = tarea.parentElement.parentElement;
    
//     const xhr = new XMLHttpRequest();

//      // Abrir la conexion

//      xhr.open('POST', './inc/models/agregar-tarea.php', true);
    
//     if(accion === "actualizar"){
        
//         const data = new FormData();

//         // Llamado a Ajax

//         data.append('id',id);
//         data.append('tipo',accion);
//         data.append('status', estado);
        

//         // Carga

//         xhr.onload = function(){
//             if(this.status === 500){
//                 console.log(JSON.parse(xhr.responseText));
//             }else if(this.status === 404){
//                 console.log(JSON.parse(xhr.responseText));
//             }else{
//                 actualizaProgreso();
//             }
//         }
//         // Envio request

//         xhr.send(data);
//     }else if(accion === "borrar"){
//         Swal.fire({
//             title: '¿Estás segura(o)?',
//             text: "Deseas eliminar la tarea",
//             type: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Si, eliminar!',
//             cancelButtonText: 'Cancelar'
//           }).then((result) => {
//             if (result.value) {

//             // Borrar de BD
//             const data = new FormData();

//             // Llamado a Ajax
    
//             data.append('id',id);
//             data.append('tipo',accion);

//             // Carga

//             xhr.onload = function(){
//                 if(this.status === 500){
//                     console.log(JSON.parse(xhr.responseText));
//                 }else if(this.status === 404){
//                     console.log(JSON.parse(xhr.responseText));
//                 }else{
//                     var resp = JSON.parse(xhr.responseText);
//                     if(resp.status === "Correcto"){     
//                         // Borrar de HTML   
//                         const listado = document.querySelector('.listado-pendientes ul');
//                         listado.removeChild(tarea);
//                         Swal.fire(
//                             'Eliminado!',
//                             'Tarea eliminada.',
//                             'success'
//                         ).then((r) => {
//                             if(r){
//                                 const listadoRestante = document.querySelectorAll('li.tarea');
//                                 if(listadoRestante.length === 0){                
//                                     document.querySelector('.listado-pendientes ul').innerHTML = "<h3>No existen tareas en el proyecto</h3>";
//                                 }
//                                 actualizaProgreso();
//                             }
                            
//                         });
//                     }
//                 }
//             }
//             // Envio request

//             xhr.send(data);
//             }
//           });
//     }
// }


// function actualizaProgreso(){
//      const listadoTareas = document.querySelectorAll('li.tarea');
//      const tareasCompletadas = document.querySelectorAll('i.completo');
//     const porcentaje = document.querySelector('#barra-progreso');
//     const avance = Math.round((tareasCompletadas / listadoTareas) * 100);
//     porcentaje.style.width = avance+'%'; 
//     if(isNaN(avance)){
//         // porcentaje.style.width = 0+'%'; 

//     }
    
// }

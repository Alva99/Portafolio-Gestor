'use stric';


// Eventos con Jquery

$("input[type='submit']").click((e) =>{ 
    e.preventDefault();
    var usuario = $('#usuario').val(),
    password = $('#password').val(),
    tipo = $('#tipo').val();


    // Validacion de campos
    if(usuario === '' || password === ''){

        swal.fire(
            'Aviso',
            'Debes rellenar todos los campos',
            'error'
        )
    }else{

        // Envio del formulario
            var data = new FormData();
            data.append('user', usuario);
            data.append('password', password);
            data.append('type', tipo);
            $.ajax({
                type: 'POST',
                url: 'inc/models/modeloAdmin',
                data: data,
                processData: false,
                contentType: false,
                async: true,
                success: function (response) {
                    var res = JSON.parse(response);
                    if(res.status === 'Correcto'){
                        // Nuevo usuario
                        if(res.type === 'crear'){
                            swal.fire('Aviso!','Se registro correctamente','success')
                            .then((r) =>{
                                if(r){
                                    window.location.href = 'login'
                                }
                            });
                        }else if(res.type === 'login'){
                            window.location.href = 'index';
                        }
                    }else{
                        swal.fire('Error','Usuario o contraseña invalido','error');
                    }
                }
            });


    }
});



// Eventos creados con Js Nativo

// EventListener();


// Funcion de validacion
// function EventListener(){
//     document.querySelector('#formulario').addEventListener('submit', (e) => {
//         e.preventDefault();
//         var usuario = document.querySelector('#usuario').value,
//         password = document.querySelector('#password').value,
//         tipo = document.querySelector('#tipo').value;


//         // Validacion de campos
//         if(usuario === '' || password === ''){

//             swal.fire(
//                 'Aviso',
//                 'Debes completar todos los campos',
//                 'error'
//             )
//         }else{
//             // Envio del formulario
//             var data = new FormData();
//             data.append('user', usuario);
//             data.append('password', password);
//             data.append('type', tipo);


//             var xhr = new XMLHttpRequest();

//             xhr.open('POST','./inc/models/modeloAdmin.php',true)
            

//             xhr.onload = function(){
//                 if(this.status === 500){
//                     console.log(JSON.parse(xhr.responseText));
//                 }
//                 else if(this.status === 404){
//                     console.log(JSON.parse(xhr.responseText));
//                 }
//                 else{
//                     var res = JSON.parse(xhr.responseText);

                    
//                     if(res.status === 'Correcto'){
//                         // Nuevo usuario
//                         if(res.type === 'crear'){
//                             swal.fire('Aviso','Se registro correctamente','success');
//                         }else if(res.type === 'login'){
//                             window.location.href = 'index';
//                         }
//                     }else{
//                         swal.fire('Error','Se genero un error ','error');
//                     }
//                 }
//             }
//             xhr.send(data);

//         }
        
//     });
// }
<?php


$accion = $_POST['type'];
$user = $_POST['user'];
$password = $_POST['password'];

if($accion === 'crear'){
    // Crear admin  

    $opcions = array(
        'cost' => 12
    );
    $hash = password_hash($password,PASSWORD_BCRYPT,$opcions); 
    include '../functions/conexion.php';

    try{
        // Consulta BD

        $stm = $conn->prepare(" INSERT INTO usuarios (nameuser, password) VALUES (?, ?) ");
        $stm->bind_param('ss', $user, $hash);
        $stm->execute();


        // var_dump($stm);
        if($stm->affected_rows > 0){
            $resp = array(
                'status' => 'Correcto',
                'message' => $stm->insert_id,
                'type' => $accion
            );
            
        }else{
            $resp = array(
                'status' => 'Invalid',
                'message' => $stm->error
            );
        }
        $stm->close();
        $conn->close();


        
        
    }catch(Exception $e){
        // Tomar error 
        
        $resp = array(
            'message' => $e->getMessage()
        );

    }   
    
    echo json_encode($resp);

    


}

if($accion === 'login'){

    // Loggear


    include '../functions/conexion.php';

    try {
        $stm = $conn->prepare("SELECT id, nameuser, password FROM usuarios WHERE nameuser = ?");
        $stm->bind_param('s', $user);
        $stm->execute();
        $stm->bind_result($id_user,$name_user,$password_user);
        $stm->fetch();
        if($name_user){

            if(password_verify($password,$password_user)){
                // Iniciar la sesion

                session_start();
                $_SESSION['nombre'] = $user;
                $_SESSION['id'] = $id_user;
                $_SESSION['login'] = true;
 

                // Enviar la respuesta  ya sea correcta o incorrecta

                $resp = array(
                    'status' => 'Correcto',
                    'name' => $name_user,
                    'pass' => $password_user,
                    'id' => $id_user,
                    'type' => $accion
                );
            }else{
                $resp = array(
                    'status' => 'Invalida password',
                    'message' => 'Intentar de nuevo'
                );
            }
           
        }else{
            $resp = array(
                'status' => 'No existe',
                'message' => 'Verificar'
            );
        }
        $stm->close();
        $conn->close();
    } catch (Exception $e) {
        //throw $th;
    }
    



    echo json_encode($resp);
}

?>

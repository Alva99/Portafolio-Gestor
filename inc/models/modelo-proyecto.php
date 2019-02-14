<?php

$proyecto = $_POST['proyecto'];
$accion = $_POST['tipo'];

if($accion == 'crear'){
 
    include '../functions/conexion.php';

    try{
        // Consulta BD

        $stm = $conn->prepare(" INSERT INTO proyectos (nombre) VALUES (?) ");
        $stm->bind_param('s', $proyecto);
        $stm->execute();


        // var_dump($stm);
        if($stm->affected_rows > 0){
            $resp = array(
                'status' => 'Correcto',
                'message' => $stm->insert_id,
                'id' => sha1($stm->insert_id), 
                'type' => $accion,
                'nombre' => $proyecto
            );
            
        }else{
            $resp = array(
                'status' => 'Invalido',
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

?>
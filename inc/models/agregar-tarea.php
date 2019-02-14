<?php
// error_reporting(E_ALL);
// ini_set('display_errors', '4');
$accion =  $_POST['tipo'];
$id = (int) $_POST['id'];

if($accion == 'crear'){
    $tarea = $_POST['tarea'];
  
    
 
    include '../functions/conexion.php';

    try{
        // Consulta BD

        $stm = $conn->prepare(" INSERT INTO tareas (nombre, id_proyecto) VALUES (?, ?) ");
        $stm->bind_param('si', $tarea, $id);
        $stm->execute();


        // var_dump($stm);
        if($stm->affected_rows > 0){
            $resp = array(
                'status' => 'Correcto',
                'message' => $stm->insert_id,
                'type' => $accion,
                'nombre' => $tarea
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
if($accion == 'actualizar'){

    $estado = $_POST['status'];
    include '../functions/conexion.php';

    try{
        // Consulta BD

        $stm = $conn->prepare(" UPDATE tareas SET status = ? WHERE id = ? ");
        $stm->bind_param('ii', $estado, $id);
        $stm->execute();


        // var_dump($stm);
        if($stm->affected_rows > 0){
            $resp = array(
                'status' => 'Correcto'
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

if($accion == 'borrar'){

    $estado = 1;
    include '../functions/conexion.php';

    try{
        // Consulta BD

        $stm = $conn->prepare(" UPDATE tareas SET status_proyect = ? WHERE id = ? ");
        $stm->bind_param('ii', $estado, $id);
        $stm->execute();


        // var_dump($stm);
        if($stm->affected_rows > 0){
            $resp = array(
                'status' => 'Correcto'
            );
            
        }else{
            $resp = array(
                'status' => 'Invalido',
                'message' => $stm
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
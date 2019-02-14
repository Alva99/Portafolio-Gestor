<?php

// Obtine pagina actual
function obtenerpag(){
    $archivo = basename($_SERVER['PHP_SELF']);
    $pagina = str_replace(".php","",$archivo);
    return $pagina;
}



// Obtener todos los proyectos


function allProyect(){
    include 'conexion.php';
try {
    return $conn->query(" SELECT * FROM proyectos ");
} catch (Exception $e) {
    echo "Error: ". $e -> getMessage();
    return false;
}

}

// Obtener el nombre del proyecto

function getProyect($id = null){
    include 'conexion.php';
    try {
        return $conn->query(" SELECT nombre FROM proyectos WHERE id = {$id} ");
    } catch (Exception $e) {
        echo "Error: ". $e -> getMessage();
        return false;
    }
}


function allTareasProyecto($id = null){
include 'conexion.php';
    try {
        return $conn->query(" SELECT id, nombre, status FROM tareas WHERE id_proyecto = {$id} AND status_proyect = 0");
    } catch (Exception $e) {
        echo "Error: ". $e -> getMessage();
        return false;
    }
}

?>
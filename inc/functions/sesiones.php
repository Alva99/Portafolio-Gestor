<?php

function autetication(){
    if(!cheoutUser()){
        header('Location:login');
        exit();
    }
}


function cheoutUser(){
    return isset($_SESSION['nombre']);
}


session_start();
autetication();

?>
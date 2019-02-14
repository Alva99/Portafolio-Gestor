<?php 
 session_start();
 include 'inc/templates/header.php';
 if(isset($_GET['cs'])){
     $_SESSION = array();
     if (ini_get("session.use_cookies")) {
         $params = session_get_cookie_params();
         setcookie(session_name(),'',time() - 4200,
         $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]);
     }
     session_destroy();
 }
?>
    <div class="contenedor-formulario">
        <h1>UpTask <span>Inicio Sesi&oacute;n</span></h1>
        <form id="formulario" class="caja-login" method="post">
            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>
            <div class="campo">
                <label for="password">Password: </label>
                <input type="password" name="password" id="password" placeholder="Password">
            </div>
            <div class="campo enviar">
                <input type="hidden" id="tipo" value="login">
                <input type="submit" class="boton" value="Iniciar Sesión">
            </div>

            <div class="campo">
                <a href="crear-cuenta">Crea una cuenta nueva</a>
            </div>
        </form>
    </div>
<?php 
    include 'inc/templates/footer.php';
?>
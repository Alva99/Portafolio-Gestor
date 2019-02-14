<script type="text/javascript" src="./js/sweetalert2.all.min.js"></script>
<script type="text/javascript" src="./js/jquery-3.3.1.min.js"></script>

<?php

$actual = obtenerpag();
if($actual === 'crear-cuenta' || $actual === 'login'){
    echo '<script src="./js/formulario.js"></script>';
}else{
    echo '<script src="./js/scripts.js"></script>';
}

?>
</body>
</html>
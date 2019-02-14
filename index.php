<?php 
    include 'inc/functions/sesiones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';

    if(isset($_GET['proyect'])){
        $id = $_GET['proyect'];
        if(strlen($id) === 41){
            $id = substr($id, -1);
        }else if(strlen($id) === 42){
            $id = substr($id, -2);
        }else{
            $id = substr($id, -3);
        }
    }else{
        $id = null;
    }
?>


<div class="contenedor">
    <?php
    
    include 'inc/templates/sidebar.php';
    
    ?>

    <main class="contenido-principal">
        <?php   
        $proyecto = getProyect($id);
        if($proyecto): ?>
            <h1>
                Proyecto Actual:
                <?php 
                    foreach($proyecto as $name):
                ?>
                <span> <?php echo $name['nombre']; ?> </span>
                <?php
                    endforeach;
                ?>
            </h1>
            <form class="agregar-tarea">
                <div class="campo">
                    <label for="tarea">Tarea:</label>
                    <input type="text" placeholder="Nombre Tarea" class="nombre-tarea"> 
                </div>
                <div class="campo enviar">
                    <input type="hidden" id="idproyecto" value="<?php echo $id; ?>">
                    <input type="submit" class="boton nueva-tarea" value="Agregar">
                </div>
            </form>
        <!-- </h1> -->

        
        
        <?php
        $tareas = allTareasProyecto($id);
        if($tareas->num_rows > 0):
        ?>
            <h2>Listado de tareas:</h2>

            <div class="listado-pendientes">
                <ul>
                    <?php
                        if($tareas){
                            foreach ($tareas as $tarea) {
                                echo "<li id={$tarea['id']} class='tarea'>";
                                echo "<p>{$tarea['nombre']}</p>";
                                echo "<div class='acciones'>"; ?>
                                <i class='valid far fa-check-circle <?php echo ($tarea['status'] == '1' ? 'completo' : '') ?>'></i>
                        <?php echo "<i class='delete fas fa-trash'></i>";
                                echo "</div>";
                                echo "</li>";
                            }
                        }else{
                            echo "<h3 class='lista-vacia'>No existen tareas en el proyecto</h3>";
                        }
                    ?>
                </ul>
            </div>
            <div class="avance">
                <h2>Avanze del proyecto</h2>
                <div id="bara-avance" class="barra-avance">
                    <div id="barra-progreso" class="barra-progreso"></div>
                </div>
            </div>


        <?php
        else:   
            echo "<h1 class='lista-vacia'> No tienes tareas iniciadas </h1>";
        endif;
        
        ?>


        <?php else: ?>
            <?php 
                echo '<h1> Elige un proyecto </h1>';
            ?>
        <?php endif; ?>
    </main>
</div><!--.contenedor-->
<?php 
    include 'inc/templates/footer.php';
?>
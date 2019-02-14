<aside class="contenedor-proyectos">
    <div class="panel crear-proyecto">
        <a class="boton">Nuevo Proyecto<i class="fas fa-plus"></i> </a>
    </div>

    <div class="panel lista-proyectos">
        <h2>Proyectos</h2>
        <ul id="proyectos">
            <?php
                $proyectos = allProyect();
                if ($proyectos) {
                    foreach ($proyectos as $proyecto) { ?>
                        <li>
                            <a href="index?proyect=<?php echo sha1($proyecto['id']); ?><?php echo $proyecto['id']; ?>" id="<?php echo $proyecto['id'];?>">
                            <?php echo $proyecto['nombre']; ?>
                            </a>
                        </li>
            <?php   }
                }
            ?>
        </ul>
    </div>
</aside>
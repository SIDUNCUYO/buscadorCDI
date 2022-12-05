<template>
 <header class="mt-3 mb-3">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <a class="vertical-align:middle" href="#">
                        <img style="width: 350px;" src="@/assets/logo-sid.jpg" />
               
                    </a>
                </div>

                <!--  col -->

            </div>
            <!-- row -->

        </div>
        <!-- container -->
    </header>
    <!---->
    <!--descripcion-->
    <div class="container-fluid mb-4 bg-uncuyo" style="background-color: rgb(212, 212, 212);">
        <div class="container pt-3 pb-2">
            <div class="row">
                <div class="col-md-10 " style="color:#000;">
                    <h2 class="fw-bold">Buscador registros marc CID</h2>
                    <p style="color:#000">Buscador de registros (BETA) CDI (https://cid.cin.edu.ar)
                        <a type="" href="#" class="pe-auto link" data-bs-toggle="modal" data-bs-target="#myModal">(+ info)</a>
                    </p>

                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-dialog-left">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title"><strong>Filtros</strong>
                </h4>
            </div>
            <!--algo-->
            <div class="modal-body fs-6">
                <ul class="list-group">
                    <li class="list-group-item"><strong>Editor: </strong>260a</li>
                    <li class="list-group-item"><strong>Año: </strong>año</li>
                    <li class="list-group-item"><strong>: </strong> Hace referencia al ámbito de aplicación del acto administrativo.</li>
                    <li class="list-group-item"><strong>tema: </strong>Hace referencia al tema 650a</li>
                    
                </ul>
                <div class="hide lead">
                    Las Columnas tipo y generado se ocultan automaticamente en vista de teléfonos o pantallas pequeñas.
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
</template>


<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

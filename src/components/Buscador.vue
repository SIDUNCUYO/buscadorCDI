<template>
    <!--Buscador nuevo-->
    <div class="form-group" id="divcampo">
        <div class="col-md-7">
            <form class="">
                <div class="col-auto">
                    <label class="col-auto control-label mb-3"><strong>Expresión de búsqueda</strong></label>
                </div>
                <div class="input-group mb-3">
                    <input v-model=buscar class="form-control" type="text">
                    <button type="submit" @click.prevent="dbuscar(1)" class="btn btn-primary"
                        value="Buscar">Buscar</button>
                </div>
            </form>
        </div>

        <div class="container">
            <div id="filtrosaplicados">

                <ul class="list-group">
                    <li v-if="filters.length > 2"
                        class="list-group-item d-flex justify-content-between align-items-start">Filtros Aplicados
                        <span @click.prevent="resetfilters();" class=" pull-right btn btn-danger mb-3 ">Anular filtros
                        </span>

                    </li>
                    <li v-for="(filter, index) in titfilters "
                        class="list-group-item d-flex justify-content-between align-items-start" :key="index">
                        {{ filter }}
                        <a @click.prevent="delfilter(index);" class="pull-right btn btn-danger btn-sm"> X </a>
                    </li>
                </ul>

            </div>
        </div>
    </div>

    <!--facetas-->
    <div class="container">
        <div v-if=!loading class="facetas col-md-10 col-md-offset-1">
            <div v-for="( facettitle, facetfield) in facettitles" :key="facetfield">
                <div v-if="facets[facetfield] && facets[facetfield].length > 1">
                    <strong>{{ facettitle }}: </strong>
                    <ul class="list-inline">
                        <li class="list-inline-item facet" v-for="(facet, n) in facets[facetfield]" :key="n">
                            <div v-if="(n <= 6)">
                                <a class="a-hover" @click.prevent="addfilter(facet.value, facetfield);" href="#">
                                    {{ facet.value }}
                                    <span class="badge text-bg-primary"> {{ facet.count }}</span>
                                </a>
                            </div>
                            <a href="#" v-if="n == 7" @click.prevent="showmore($event, facetfield)"
                                title="se muestran solamente los 30 primeros grupos"><small> Ver más</small> </a>
                            <span v-if="(n >= 7)" :class="facetfield + ' oculta'">
                                <a class="a-hover" @click.prevent="addfilter(facet.value, facetfield);">
                                    {{ facet.value }}
                                    <span class="badge text-bg-primary"> {{ facet.count }}</span>
                                </a>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!--fin facetas-->
    <!--paginador nuevo-->
    <div class="container">
        <div class="row well well-sm" v-show=!loading>
            <div class="col-md-4 col-md-offset-2">
                <paginate ref="paginartop" v-show="found > 0" v-model=page :page-count="pagecount"
                    :container-class="pagination" prev-text="&laquo;" next-text="&raquo;" :click-handler="changepage"
                    page-class="page-item" page-link-class="page-link" prev-link-class="page-link"
                    next-link-class="page-link">
                </paginate>

            </div>
            <!--Fin Paginador nuevo-->

            <div class="col-12 mb-3">
                <br /><strong> Encontrados {{ found }} objetos </strong>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="row">
            <div class="col-12 col-md-offset-1">
                <div v-if=errorencarga class="alert alert-danger">Error</div>
                <div v-if=loading class="loader">
                    <spinner />
                </div>

                <div class="table-responsive-md">
                    <table v-if=!loading class="table">
                        <thead>
                            <!-- <th rowspan="1" colspan="1">#ID</th> -->
                            <th rowspan="1" colspan="1" class="d-none d-md-block">Tipo</th>
                            <th rowspan="1" colspan="1">Título</th>
                            <th rowspan="1" colspan="1" class="d-none d-md-block">Generador</th>

                            <th rowspan="1" colspan="1">Fecha</th>

                        </thead>
                        <tbody>
                            <tr v-for="(rec, index) in records" :key="index">

                                <td class="d-none d-md-block">
                                    {{ rec.rawData.tipo_str }}
                                    <div class="small"><small class="text-muted small">{{ rec.id }}</small>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-sm-none">
                                        {{ rec.rawData.tipo_str }}</div>
                                    <a target="fichareg"
                                        :href="urlrecords + rec.rawData.fecha_str.substring(0, 4) + '/' + rec.rawData.fecha_str.substring(5, 7) + '/' + rec.rawData.archivo_str"
                                        class="link">{{ rec.title }}</a>


                                    <blockquote v-if="rec.rawData.descripcion_str">
                                        {{ rec.rawData.descripcion_str }}
                                    </blockquote>

                                    <span class="badge rounded-pill text-bg-success"
                                        v-show="rec.rawData.estado_str == 'V'">
                                        Vigente
                                    </span>
                                    <span class="badge rounded-pill text-bg-danger"
                                        v-show="rec.rawData.estado_str == 'D'"> Derogada</span>
                                    <span class="badge rounded-pill text-bg-danger"
                                        v-show="rec.rawData.estado_str == 'P'"> Parcialmente Derogada </span>
                                    <span class="badge rounded-pill text-bg-secondary"
                                        v-show="rec.rawData.estado_str == 'A'"> Actualizada </span>
                                </td>
                                <td class="d-none d-md-block">
                                    {{ rec.rawData.dep_genera_str }}
                                </td>
                                <td>{{ formatfecha(rec.rawData.fecha_str) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <!--paginador nuevo-->
                <div class="container">
                    <div class="row well well-sm" v-show=!loading>
                        <div class="col-md-4 col-md-offset-2">
                            <paginate ref="paginarbottom" v-show="found>0" v-model=page :page-count="pagecount"
                                :container-class="pagination" prev-text="&laquo;" next-text="&raquo;"
                                :click-handler="changepage" page-class="page-item" page-link-class="page-link"
                                prev-link-class="page-link" next-link-class="page-link">
                            </paginate>

                        </div>
                        <!--Fin Paginador nuevo-->

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
   
   
<script >
import Paginate from "vuejs-paginate-next";
import Spinner from './Spinner.vue'

const conf = {
    facets: {
        'tipo_str': 'Tipo',
        'publishDate': 'Año',
        'dep_aplicacion_str': 'Aplicado',
        'dep_genera_str': 'Generado',
        'categoria_str': 'Categoría',
        // 'estado_str': 'Estado'

    },
    apiurl: 'https://bibliotecas.uncuyo.edu.ar/explorador3/api/v1/search',
    urlrecords: 'https://www.uncuyo.edu.ar/filesd/'
};
export default {
    components: {
        Paginate, Spinner
    },
    data() {
        return {
            buscar: '',
            pagination: 'pagination',
            prev: "<<",
            next: ">>",
            pagecount: 0,
            loading: false,
            found: 0,
            respuesta: [],
            records: [],
            errorencarga: false,
            facets: [],
            filters: ['building:DigestoUNCUYO', 'record_format:digesto'],
            titfilters: [],
            facettitles: conf.facets, // Object.values(conf.facets)
            filtrosextras: false,
            propias: false,
            page: 1,
            urlrecords: conf.urlrecords
        }
    },
    mounted: function () {
        this.buscar = ''
        this.dbuscar(1)
    },
    methods: {
        formatfecha: function (f) {
            const parts = f.split('-');
            if (parts.length != 3) return f;
            if (f.length === 10)
                return f.split('-').reverse().join('/');
            else return f;
        },

        changepage: function (page) {
            this.page = page;

            this.$refs.paginartop.selected = page - 1; //(page);

            this.$refs.paginarbottom.selected = page - 1
            this.dbuscar(page);

        },
        dbuscar: function (page) {
            console.log(page)
            this.loading = true;
            //bibliotecas.uncu.edu.ar/explorador3 //localhost/vufind
            //const url = 'https://bibliotecas.uncuyo.edu.ar/explorador3/api/v1/search';


           // let filtros = this.filter; 
            //this.filters.push('estado_str:3');
            this.$axios.get(conf.apiurl, {
                crossDomain: true,
                params: {
                    lookfor: this.buscar,
                    filter: this.filters,
                    facet: Object.keys(conf.facets),
                    field: ['id',
                        'rawData',
                        'secondaryAuthors', 'title', 'subjects', 'formats', 'humanReadablePublicationDates'
                    ],
                    type: 'AllFields',
                    sort: 'year',
                    page: page,
                    limit: 20,
                    prettyPrint: false,
                    lng: 'es'
                }
            })
                .then((response) => {
                    this.errorencarga = false;
                    this.respuesta = response.data;
                    this.loading = false;
                    this.found = response.data.resultCount;
                    if (this.found == 0) {
                        this.records = [];
                        this.facets = [];
                        this.pagecount = 0;
                        alert('Nada encontrado con el filtro usado');
                    } else {
                        this.records = response.data.records;
                        this.facets = response.data.facets;
                        //console.table(this.facets);
                        this.pagecount = Math.floor(response.data.resultCount / 20);
                    }

                })
                .catch((error) => {
                    this.errorencarga = true;
                });
        },
        showmore: function (e, que) {
            e.target.classList.toggle('oculta');
            var x = document.querySelectorAll('.' + que).forEach(x => x.classList.toggle('oculta'));
        },
        delfilter: function (indexfilter) {

            this.filters = arrremove(this.filters, indexfilter + 2);
            this.titfilters = arrremove(this.titfilters, indexfilter);
            this.dbuscar(0);

        },
        resetfilters: function () {
            this.filters = ['building:DigestoUNCUYO', 'record_format:digesto'];
            this.titfilters = [];
            this.dbuscar(0);
        },
        addfilter: function (value, field) {

            let k = conf.facets[field] + ": " + value;
            let v = field + ":\"" + value + "\"";

            this.filters.push(v);
            this.titfilters.push(k);
            console.log('add')
            console.log(this.titfilters)
            this.dbuscar();
        }
    }
}


function arrremove(arrOriginal, elementToRemove) {
    return arrOriginal.filter(function (i, el) { return el !== elementToRemove });
}
</script>
<style scoped>
.visible {
    visibility: visible !important;
}

.oculta {
    display: none !important;
}
</style>
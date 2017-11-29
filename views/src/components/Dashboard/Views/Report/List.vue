<template>
  <div>
    <loading :isLoading="loading"/>
    <div class="filters">
      <div class="row">
        <div class="form-group col-md-4 form-inline">
          <label>Desde</label>
          <!-- <input class="form-control" 
            type="date" 
            v-model="search.from"> -->
            <datepicker v-model="search.from" class="datepicker"></datepicker>
        </div>
        <div class="form-group col-md-4 form-inline">
          <label>Hasta</label>
          <!-- <input class="form-control" 
            type="date"
            v-model="search.to"> -->
            <datepicker v-model="search.to" class="datepicker"></datepicker>
        </div>
        <div class="form-group col-md-4 form-inline">
          <!-- <button class="btn btn-default" @click="today">
            Hoy
          </button> -->
          <button class="btn btn-default" @click="clean">
            Limpiar
          </button>
        </div>
        <div class="col-md-4 form-group">
          <label>Tipo de vehículo</label>
          <select v-model="search.type" class="form-control">
            <option :value="undefined">-- Seleccione --</option>
            <option v-for="type in types" :value="type._id">{{ type.description }}</option>
          </select>
        </div>
        <div class="col-md-4 form-group">
          <label>Estado de la renta</label>
          <select v-model="search.status" class="form-control">
            <option :value="undefined">-- Todas --</option>
            <option value="completed">Completadas</option>
            <option value="active">Activas</option>
            <option value="checking">Revisión</option>
          </select>
        </div>
      </div>
      <div class="col-md-offset-8 col-md-4">
        <button class="btn btn-info" @click="query">
          Buscar
        </button>
        <button class="btn btn-default" @click="print">
          <i class="ti ti-printer"></i>
        </button>
        <button class="btn btn-default" @click="download">
          <i class="ti ti-download"></i>
        </button>
      </div>
    </div>
    <h1 id="table-title">Reporte de rentas</h1>
    <div id="report-table" class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Vehículo</th>
            <th>Cliente</th>
            <th>Fecha Renta</th>
            <th>Fecha Retorno</th>
            <th>Recargo</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rent in results">
            <td>
              {{ rent.vehicle }}
            </td>
            <td>
              {{ rent.customer }}
            </td>
            <td>
              {{ rent.rentDate }}
            </td>
            <td>
              {{ rent.returnedDate }}
            </td>
            <td>RD$ {{ rent.surcharge }}</td>
            <td>RD$ {{ rent.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="alert alert-info text-center" v-if="results.length === 0">
      No hay resultados para mostrar
    </div>
  </div>
</template>

<script>

import Loading from 'src/components/UIComponents/Loading'
import VehicleTypeService from 'src/services/vehicle-type'
import Datepicker from 'vuejs-datepicker'
import ReportService from 'src/services/report'

export default {
  components: {
    Loading,
    Datepicker
  },
  data: function () {
    return {
      loading: false,
      results: [],
      search: {},
      types: []
    }
  },
  mounted: function () {
    VehicleTypeService
      .getAll()
      .then(types => {
        this.types = types
      })
      .catch(console.error)
  },
  methods: {
    query: function () {
      this.loading = true

      ReportService
        .getAll(this.search)
        .then(report => {
          this.results = report
        })
        .catch(console.error)
        .then(() => {
          this.loading = false
        })
    },
    today: function () {
      // this.search.from = this.$moment().toDate()
      // this.search.to = this.$moment().toDate()
    },
    clean: function () {
      this.search = {}
    },
    print: function () {
      window.print()
    },
    download: function () {
      let pdf = new this.$jspdf()
      pdf.fromHTML(document.querySelector('#report-table'), 15, 15, {
        width: 160
      })
      pdf.save()
    }
  }
}
</script>

<style type="text/css">
  #table-title {
    display: none;
  }
  .datepicker {
    display: inline-block;
  }
  @media print {
    .filters {
      display: none;
    }
    #table-title {
      display: block;
    }
    .footer {
      display: none;
    }
    .table-responsive {
      overflow: inherit!important;
    }
  }
</style>

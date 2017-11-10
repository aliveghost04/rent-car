<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <div class="col-md-12">
      <div class="card">
        <div class="header">
          <slot name="header">
            <h4 class="title">Listado de rentas</h4>
          </slot>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-stripped">
            <thead>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Fecha de renta</th>
              <th>Fecha de retorno</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              <tr v-for="rent in rents" :key="rent._id">
                <td>{{ rent.vehicle }}</td>
                <td>{{ rent.customer }}</td>
                <td>{{ rent.rentDate }}</td>
                <td>{{ rent.returnDate }}</td>
                <td>
                  <router-link :to="{
                    name: 'inspection-return',
                    params: {
                      id: rent._id
                    }
                  }" class="btn btn-primary">
                    Devolución
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Loading from 'src/components/UIComponents/Loading'
  import RentService from 'src/services/rent'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        rents: []
      }
    },
    methods: {
        // this.$swal({
        //   title: 'Confirmar',
        //   icon: 'warning',
        //   text: '¿Estás seguro que quieres eliminar este combustible?',
        //   dangerMode: true,
        //   buttons: true
        // })
        // .then(deleteIt => {
        //   if (deleteIt) {
        //   }
        // })
    },
    mounted: function () {
      RentService
        .getAll({
          $select: [
            'customer',
            'vehicle',
            'rentDate',
            'returnDate'
          ]
        }, true)
        .then(rents => {
          this.rents = rents
        })
        .catch(console.error)
        .then(() => {
          this.loading = false
        })
    }
  }
</script>

<style type="text/css">
  .add-button {
    margin-bottom: 10px;
  }
</style>

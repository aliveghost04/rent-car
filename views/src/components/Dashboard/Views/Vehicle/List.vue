<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <div class="col-md-12">
      <div>
        <search :options="searchOptions" @search="search" />
        <router-link 
          :to="{ name: 'vehicle-add' }" 
          class="btn btn-primary add-button">

          Agregar
        </router-link>
      </div>
      <div class="card" v-if="vehicles.length > 0">
        <div class="header">
          <slot name="header">
            <h4 class="title">Listado de Vehículos</h4>
          </slot>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-stripped">
            <thead>
              <th>Imagen</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Combustible</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              <tr v-for="vehicle in vehicles" :key="vehicle.id">
                <td>
                  <img :src="vehicle.image" :alt="`${vehicle.brand} ${vehicle.model}`">
                </td>
                <td>{{ vehicle.brand }}</td>
                <td>{{ vehicle.model }}</td>
                <td>{{ vehicle.gasType }}</td>
                <td>{{ vehicle.type }}</td>
                <td>{{ vehicle.statusText }}</td>
                <td>
                  <router-link v-if="vehicle.status === 'active'" 
                    :to="{
                      name: 'inspection-add',
                      params: {
                        id: vehicle.id
                      }
                    }" class="btn btn-success">
                    
                    Rentar
                  </router-link>
                  <router-link :to="{
                    name: 'vehicle-edit',
                    params: {
                      id: vehicle.id
                    }
                  }" class="btn btn-warning">
                    <i class="ti-pencil"></i>
                  </router-link>
                  <button type="button"
                    class="btn btn-danger" 
                    @click.prevent="remove(vehicle.id)">
                    <i class="ti-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="alert alert-info" v-if="vehicles.length === 0">
        No hay vehículos para mostrar
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from 'src/components/UIComponents/Loading'
  import PaperTable from 'src/components/UIComponents/PaperTable'
  import Search from 'src/components/UIComponents/Search'
  import VehicleService from 'src/services/vehicles'

  export default {
    components: {
      Loading,
      PaperTable,
      Search
    },
    data: function () {
      return {
        loading: true,
        vehicles: [],
        searchOptions: [{
          label: 'Número de chasis',
          value: 'chasisNumber'
        }, {
          label: 'Número de motor',
          value: 'engineNumber'
        }, {
          label: 'Número de placa',
          value: 'plateNumber'
        }]
      }
    },
    mounted: function () {
      VehicleService
        .getAll({}, true)
        .then(vehicles => {
          this.vehicles = vehicles
        })
        .catch(console.error)
        .then(() => {
          this.loading = false
        })
    },
    methods: {
      remove (id) {
        this.$swal({
          title: 'Confirmar',
          icon: 'warning',
          text: '¿Estás seguro que quieres eliminar este vehículo?',
          dangerMode: true,
          buttons: true
        }).then(deleteIt => {
          if (deleteIt) {
            VehicleService
              .delete(id)
              .then(res => {
                this.$notifications.notify({
                  message: 'El vehículo ha sido eliminado exitosamente',
                  type: 'success',
                  icon: 'ti-check',
                  horizontalAlign: 'right',
                  verticalAlign: 'bottom'
                })

                this.vehicles = this
                  .vehicles
                  .filter(vehicle => vehicle.id !== id)
              }).catch(console.error)
          }
        })
      },
      search: function (searchTerm) {
        this.loading = true

        VehicleService
          .getAll({
            q: searchTerm.text,
            field: searchTerm.type
          }, true)
          .then(vehicles => {
            this.vehicles = vehicles
          })
          .catch(console.error)
          .then(() => {
            this.loading = false
          })
      }
    }
  }
</script>

<style type="text/css">
  .add-button {
    margin-bottom: 10px;
  }
</style>

<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <div class="col-md-12">
      <div class="text-right add-button">
        <router-link 
          :to="{ name: 'vehicle-type-add' }" 
          class="btn btn-primary">

          Agregar
        </router-link>
      </div>
      <div class="card">
        <div class="header">
          <slot name="header">
            <h4 class="title">Listado de tipos de vehículos</h4>
          </slot>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-stripped">
            <thead>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              <tr v-for="type in types" :key="type._id">
                <td>{{ type.description }}</td>
                <td>
                  <i class="ti-check text-success" 
                    v-if="type.active"
                    title="Activo">
                  </i>
                  <i class="ti-close text-warning" 
                    v-if="!type.active"
                    title="Inactivo">
                  </i>
                </td>
                <td>
                  <router-link :to="{
                    name: 'vehicle-type-edit',
                    params: {
                      id: type._id
                    }
                  }" class="btn btn-warning">
                    <i class="ti-pencil"></i>
                  </router-link>
                  <button type="button"
                    class="btn btn-danger" 
                    @click.prevent="remove(type._id)">
                    <i class="ti-trash"></i>
                  </button>
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
  import VehicleTypeService from 'src/services/vehicle-type'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        types: []
      }
    },
    methods: {
      remove: function (id) {
        this.$swal({
          title: 'Confirmar',
          icon: 'warning',
          text: '¿Estás seguro que quieres eliminar esta marca de vehículo?',
          dangerMode: true,
          buttons: true
        }).then(deleteIt => {
          if (deleteIt) {
            VehicleTypeService
              .delete(id)
              .then(res => {
                this.$notifications.notify({
                  message: 'La marca de vehículo ha sido eliminado exitosamente',
                  type: 'success',
                  icon: 'ti-check',
                  horizontalAlign: 'right',
                  verticalAlign: 'bottom'
                })

                this.types = this
                  .types
                  .filter(type => type._id !== id)
              }).catch(console.error)
          }
        })
      }
    },
    mounted: function () {
      VehicleTypeService
        .getAll()
        .then(types => {
          this.types = types
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

<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <div class="col-md-12">
      <div class="text-right add-button">
        <router-link 
          :to="{ name: 'vehicle-model-add' }" 
          class="btn btn-primary">

          Agregar
        </router-link>
      </div>
      <div class="card">
        <div class="header">
          <slot name="header">
            <h4 class="title">Listado de modelos de vehículos</h4>
          </slot>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-stripped">
            <thead>
              <th>Marca</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              <tr v-for="model in models" :key="model._id">
                <td>{{ model.brand.description }}</td>
                <td>{{ model.description }}</td>
                <td>
                  <i class="ti-check text-success" 
                    v-if="model.active"
                    title="Activo">
                  </i>
                  <i class="ti-close text-warning" 
                    v-if="!model.active"
                    title="Inactivo">
                  </i>
                </td>
                <td>
                  <router-link :to="{
                    name: 'vehicle-model-edit',
                    params: {
                      id: model._id
                    }
                  }" class="btn btn-warning">
                    <i class="ti-pencil"></i>
                  </router-link>
                  <button type="button"
                    class="btn btn-danger" 
                    @click.prevent="remove(model._id)">
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
  import VehicleModelService from 'src/services/vehicle-model'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        models: []
      }
    },
    methods: {
      remove: function (id) {
        this.$swal({
          title: 'Confirmar',
          icon: 'warning',
          text: '¿Estás seguro que quieres eliminar este modelo de vehículo?',
          dangerMode: true,
          buttons: true
        }).then(deleteIt => {
          if (deleteIt) {
            VehicleModelService
              .delete(id)
              .then(res => {
                this.$notifications.notify({
                  message: 'El modelo de vehículo ha sido eliminado exitosamente',
                  type: 'success',
                  icon: 'ti-check',
                  horizontalAlign: 'right',
                  verticalAlign: 'bottom'
                })

                this.models = this
                  .models
                  .filter(model => model._id !== id)
              }).catch(console.error)
          }
        })
      }
    },
    mounted: function () {
      VehicleModelService
        .getAll()
        .then(models => {
          this.models = models
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

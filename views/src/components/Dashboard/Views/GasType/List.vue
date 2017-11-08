<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <div class="col-md-12">
      <div class="text-right add-button">
        <router-link 
          :to="{ name: 'gas-type-add' }" 
          class="btn btn-primary">

          Agregar
        </router-link>
      </div>
      <div class="card">
        <div class="header">
          <slot name="header">
            <h4 class="title">Listado de tipos de combustibles</h4>
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
              <tr v-for="gasType in gasTypes" :key="gasType._id">
                <td>{{ gasType.description }}</td>
                <td>
                  <i class="ti-check text-success" 
                    v-if="gasType.active"
                    title="Activo">
                  </i>
                  <i class="ti-close text-warning" 
                    v-if="!gasType.active"
                    title="Inactivo">
                  </i>
                </td>
                <td>
                  <router-link :to="{
                    name: 'gas-type-edit',
                    params: {
                      id: gasType._id
                    }
                  }" class="btn btn-warning">
                    <i class="ti-pencil"></i>
                  </router-link>
                  <button type="button"
                    class="btn btn-danger" 
                    @click.prevent="remove(gasType._id)">
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
  import GasTypeService from 'src/services/gas-type'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        gasTypes: []
      }
    },
    methods: {
      remove: function (id) {
        this.$swal({
          title: 'Confirmar',
          icon: 'warning',
          text: '¿Estás seguro que quieres eliminar este combustible?',
          dangerMode: true,
          buttons: true
        }).then(deleteIt => {
          if (deleteIt) {
            GasTypeService
              .delete(id)
              .then(res => {
                this.$notifications.notify({
                  message: 'El combustible ha sido eliminado exitosamente',
                  type: 'success',
                  icon: 'ti-check',
                  horizontalAlign: 'right',
                  verticalAlign: 'bottom'
                })

                this.gasTypes = this
                  .gasTypes
                  .filter(gasType => gasType.id !== id)
              }).catch(console.error)
          }
        })
      }
    },
    mounted: function () {
      GasTypeService
        .getAll()
        .then(gasTypes => {
          this.gasTypes = gasTypes
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

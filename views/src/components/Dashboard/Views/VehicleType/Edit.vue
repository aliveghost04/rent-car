<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form v-if="type" class="col-md-6 col-md-offset-3">
      <fg-input type="text"
        v-model.trim="type.description"
        label="Nombre"
        title="Nombre">
      </fg-input>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="type.active" required=""> Activo
        </label>
      </div>
      <button 
        class="btn btn-lg btn-primary btn-block" 
        @click="save" 
        type="submit">

        Guardar
      </button>
    </form>
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
        type: null
      }
    },
    methods: {
      save: function () {
        VehicleTypeService
          .update(this.type)
          .then(type => {
            this.$router.push({
              name: 'vehicle-type-list'
            })
          })
          .catch(console.error)
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        VehicleTypeService
          .get(this.$route.params.id)
          .then(type => {
            this.type = type
          })
          .catch(console.error)
          .then(() => {
            this.loading = false
          })
      } else {
        this.$notifications.notify({
          message: 'Id de marca de vehículo inválido',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
        this.$router.replace({
          name: 'vehicle-type-list'
        })
      }
    }
  }
</script>

<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form v-if="brand" class="col-md-6 col-md-offset-3">
      <fg-input type="text"
        v-model.trim="brand.description"
        label="Nombre"
        title="Nombre">
      </fg-input>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="brand.active" required=""> Activo
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
  import VehicleBrandService from 'src/services/vehicle-brand'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        brand: null
      }
    },
    methods: {
      save: function () {
        VehicleBrandService
          .update(this.brand)
          .then(brand => {
            this.$router.push({
              name: 'vehicle-brand-list'
            })
          })
          .catch(console.error)
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        VehicleBrandService
          .get(this.$route.params.id)
          .then(brand => {
            this.brand = brand
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
          name: 'vehicle-brand-list'
        })
      }
    }
  }
</script>

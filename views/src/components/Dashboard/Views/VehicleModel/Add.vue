<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form v-if="brands" class="col-md-6 col-md-offset-3">
      <div class="form-group">
        <label>Marca</label>
        <select v-model="model.brand" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="brand in brands" :value="brand._id" v-text="brand.description"></option>
        </select>
      </div>
      <fg-input type="text"
        v-model.trim="model.description"
        label="Nombre"
        title="Nombre">
      </fg-input>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="model.active" required=""> Activo
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
  
  import VehicleBrandService from 'src/services/vehicle-brand'
  import VehicleModelService from 'src/services/vehicle-model'
  import Loading from 'src/components/UIComponents/Loading'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        model: {
          active: false
        },
        brands: null
      }
    },
    mounted: function () {
      VehicleBrandService
        .getAll()
        .then(brands => {
          this.brands = brands
        })
        .catch(console.error)
        .then(() => {
          this.loading = false
        })
    },
    methods: {
      save: function () {
        VehicleModelService
          .save(this.model)
          .then(model => {
            this.$router.push({
              name: 'vehicle-model-list'
            })
          })
          .catch(console.error)
      }
    }
  }
</script>

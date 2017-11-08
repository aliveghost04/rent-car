<template>
  <div class="row">
    <form class="col-md-6 col-md-offset-3">
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
  
  import VehicleBrandService from 'src/services/vehicle-brand'

  export default {
    data: function () {
      return {
        brand: {
          active: false
        }
      }
    },
    methods: {
      save: function () {
        VehicleBrandService
          .save(this.brand)
          .then(brand => {
            this.$router.push({
              name: 'vehicle-brand-list'
            })
          })
          .catch(console.error)
      }
    }
  }
</script>

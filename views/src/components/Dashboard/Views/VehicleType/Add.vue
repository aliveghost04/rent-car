<template>
  <div class="row">
    <form class="col-md-6 col-md-offset-3">
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
  
  import VehicleTypeService from 'src/services/vehicle-type'

  export default {
    data: function () {
      return {
        type: {
          active: false
        }
      }
    },
    methods: {
      save: function () {
        VehicleTypeService
          .save(this.type)
          .then(type => {
            this.$router.push({
              name: 'vehicle-type-list'
            })
          })
          .catch(console.error)
      }
    }
  }
</script>

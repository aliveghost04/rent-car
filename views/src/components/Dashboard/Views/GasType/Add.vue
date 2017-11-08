<template>
  <div class="row">
    <form class="col-md-6 col-md-offset-3">
      <fg-input type="text"
        v-model.trim="gasType.description"
        label="Nombre"
        title="Nombre">
      </fg-input>
      <div class="form-group">
        <label>Unidad de medida</label>
        <select v-model="gasType.mesure" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option value="gls">Galones / gls</option>
          <option value="m3s">Metros cúbicos / m3s</option>
        </select>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="gasType.active" required=""> Activo
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
  
  import GasTypeService from 'src/services/gas-type'

  export default {
    data: function () {
      return {
        gasType: {
          active: false
        }
      }
    },
    methods: {
      save: function () {
        GasTypeService
          .save(this.gasType)
          .then(gasType => {
            this.$router.push({
              name: 'gas-type-list'
            })
          })
          .catch(console.error)
      }
    }
  }
</script>

<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form v-if="gasType" class="col-md-6 col-md-offset-3">
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
  
  import Loading from 'src/components/UIComponents/Loading'
  import GasTypeService from 'src/services/gas-type'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        gasType: null
      }
    },
    methods: {
      save: function () {
        GasTypeService
          .update(this.gasType)
          .then(gasType => {
            this.$router.push({
              name: 'gas-type-list'
            })
          })
          .catch(console.error)
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        GasTypeService
          .get(this.$route.params.id)
          .then(gasType => {
            this.gasType = gasType
          })
          .catch(console.error)
          .then(() => {
            this.loading = false
          })
      } else {
        this.$notifications.notify({
          message: 'Id de combustible inválido',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
        this.$router.replace({
          name: 'gas-type-list'
        })
      }
    }
  }
</script>

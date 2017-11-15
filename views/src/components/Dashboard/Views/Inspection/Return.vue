<template>
  <div class="row">
    <form class="col-md-6 col-md-offset-3">
      <div class="form-group">
        <label>Cantidad de Combustible</label>
        <select v-model="inspection.gasQuantity" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option value="empty">Vacío</option>
          <option value="quarter">1/4</option>
          <option value="half">1/2</option>
          <option value="three_quarter">3/4</option>
          <option value="full">Lleno</option>
        </select>
      </div>
      <div class="form-group">
        <label>Condición de los neumáticos</label>
        <select v-model="inspection.wheelsState" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option value="bad">Mal</option>
          <option value="normal">Regular</option>
          <option value="good">Buen</option>
        </select>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="inspection.hasScratchs">
          Tiene rayaduras
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="inspection.spareTire">
          Rueda de repuesto
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="inspection.hasJack">
          Gato
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="inspection.hasBrokenWindows">
          Cristal roto
        </label>
      </div>
      <button 
        class="btn btn-lg btn-primary btn-block" 
        @click.prevent="save" 
        type="submit">

        Guardar
      </button>
    </form>
  </div>
</template>

<script>

import InspectionService from 'src/services/inspection'

export default {
  data: function () {
    return {
      inspection: {
        type: 'return',
        hasScratchs: false,
        hasJack: false,
        hasBrokenWindows: false,
        spareTire: false
      }
    }
  },
  mounted: function () {
    if (this.$route.params.id) {
      this.inspection.rent = this.$route.params.id
    } else {
      this.$router.push({
        name: 'rent-list'
      })
    }
  },
  methods: {
    save: function () {
      InspectionService
        .save(this.inspection)
        .then(inspection => {
          this.$router.push({
            name: 'rent-return',
            params: {
              id: this.$route.params.id
            }
          })
        })
        .catch(console.error)
    }
  }
}
</script>

<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form class="col-md-6 col-md-offset-3" v-if="customers">
      <div class="form-group">
        <label>Cliente</label>
        <select v-model="inspection.customer" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="customer in customers" :value="customer._id">{{ customer.name }} - {{ customer.cedula }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="inspection.hasScratchs">
          Tiene rayaduras
        </label>
      </div>
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
      <div class="form-group">
        <label>Condición de los neumáticos</label>
        <select v-model="inspection.wheelsState" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option value="bad">Mal</option>
          <option value="normal">Regular</option>
          <option value="good">Buen</option>
        </select>
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

import Loading from 'src/components/UIComponents/Loading'
import CustomerService from 'src/services/customer'
import InspectionService from 'src/services/inspection'

export default {
  components: {
    Loading
  },
  data: function () {
    return {
      loading: true,
      inspection: {
        type: 'rent',
        hasScratchs: false,
        hasJack: false,
        hasBrokenWindows: false,
        spareTire: false
      },
      customers: null
    }
  },
  mounted: function () {
    if (this.$route.params.id) {
      this.inspection.vehicle = this.$route.params.id
    } else {
      this.$router.push({
        name: 'inspection-list'
      })
    }

    CustomerService
      .getAll()
      .then(customers => {
        this.customers = customers
      })
      .catch(console.error)
      .then(() => {
        this.loading = false
      })
  },
  methods: {
    save: function () {
      InspectionService
        .save(this.inspection)
        .then(inspection => {
          this.$router.push({
            name: 'rent-add',
            params: {
              id: inspection._id
            }
          })
        })
        .catch(console.error)
    }
  }
}
</script>

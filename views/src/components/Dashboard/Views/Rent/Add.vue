<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form class="col-md-6 col-md-offset-3">
      <div class="form-group">
        <label>Cliente</label>
        <select v-model="rent.customer" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="customer in customers" 
            :value="customer._id">
            {{ customer.name }} - {{ customer.cedula }}
          </option>
        </select>
      </div>
      <fg-input type="date"
        v-model="rent.returnDate"
        label="Fecha esperada de retorno"
        title="Fecha esperada de retorno">
      </fg-input>
      <fg-input type="number"
        v-model.number="rent.costPerDay"
        label="Costo por día"
        title="Costo por día">
      </fg-input>
      <div class="form-group">
        <label>Comentario</label>
        <textarea class="form-control" v-model.trim="rent.comment"></textarea>
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
  import RentService from 'src/services/rent'
  import VehicleService from 'src/services/vehicles'
  import InspectionService from 'src/services/inspection'
  import CustomerService from 'src/services/customer'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        rent: {},
        customers: null
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        this.rent.inspection = this.$route.params.id
      } else {
        this.$router.replace({
          name: 'rent-list'
        })
      }

      InspectionService
        .get(this.rent.inspection, {
          '$select': ['vehicle']
        })
        .then(inspection => {
          return VehicleService
            .get(inspection.vehicle, {
              $select: ['costPerDay']
            })
        })
        .then(vehicle => {
          this.rent.costPerDay = vehicle.costPerDay

          return CustomerService
            .getAll()
        })
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
        RentService
          .save(this.rent)
          .then(rent => {
            this.$notifications.notify({
              message: 'Vehículo rentado exitosamente',
              horizontalAlign: 'right',
              verticalAlign: 'bottom',
              type: 'success',
              icon: 'ti-check'
            })
            this.$router.push({
              name: 'rent-list'
            })
          })
          .catch(console.error)
      }
    }
  }
</script>

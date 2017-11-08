<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form v-if="customer">
      <div class="col-md-6">
        <fg-input type="text"
          v-model.trim="customer.name"
          label="Nombre"
          title="Nombre">
        </fg-input>
        <fg-input type="email"
          v-model.trim="customer.email"
          label="Email"
          title="Email">
        </fg-input>
        
        <div class="form-group">
          <label>Tarjeta de crédito</label>
          <input type="number" class="form-control" v-model="customer.creditCard.number">
          <label>CVV</label>
          <input type="number" class="form-control" v-model="customer.creditCard.cvv">
        </div>
        <div class="form-group">
          <label>Fecha de expiración</label>
        </div>
        <div class="form-inline">
          <div class="form-group">
            <label>
              Mes
              <select v-model="customer.creditCard.expirationDate.month" class="form-control">
                <option :value="undefined">Seleccione</option>
                <option v-for="month in months" :value="month">{{ month }}</option>
              </select>
            </label>
          </div>
          <div class="form-group">
            <label>
              Año
              <select v-model="customer.creditCard.expirationDate.year" class="form-control">
                <option :value="undefined">Seleccione</option>
                <option v-for="year in years" :value="year">{{ year }}</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <fg-input type="number"
          v-model.number="customer.cedula"
          label="Cédula"
          title="Cédula">
        </fg-input>
        
        <fg-input type="number"
          v-model.number="customer.creditLimit"
          label="Límite de crédito"
          title="Límite de crédito">
        </fg-input>
        
        <div class="form-group">
          <label>Tipo de cliente</label>
          <select v-model="customer.personType" class="form-control">
            <option :value="undefined">Seleccione</option>
            <option value="person">Persona Física</option>
            <option value="entity">Persona Jurídica</option>
          </select>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="customer.active" required="">
            Activo
          </label>
        </div>
      </div>
      <div class="col-md-6 col-md-offset-3">
        <button 
          class="btn btn-lg btn-primary btn-block" 
          @click.prevent="save" 
          type="submit">

          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">

  import CustomerService from 'src/services/customer'
  import Loading from 'src/components/UIComponents/Loading'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        months: [],
        years: [],
        customer: null
      }
    },
    beforeMount: function () {
      this.months = []
      this.years = []

      for (let x = 1; x <= 12; x++) {
        this.months.push(x)
      }
      let actualYear = new Date().getFullYear()
      let yearTop = actualYear + 10
      for (let x = actualYear; x <= yearTop; x++) {
        this.years.push(x)
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        CustomerService
          .get(this.$route.params.id)
          .then(customer => {
            this.customer = customer
          })
          .catch(console.error)
          .then(() => {
            this.loading = false
          })
      } else {
        this.$notifications.notify({
          message: 'Id de cliente inválido',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
        this.$router.replace({
          name: 'customer-list'
        })
      }
    },
    methods: {
      save: function () {
        CustomerService
          .update(this.customer)
          .then(res => {
            this.$router.push({
              name: 'customer-list'
            })
          })
          .catch(console.error)
      }
    }
  }
</script>

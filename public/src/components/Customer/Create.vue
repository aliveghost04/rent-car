<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Agregar cliente</h2>
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" class="form-control" v-model="customer.name">
      </div>
      <div class="form-group">
        <label>Cédula</label>
        <input type="text" class="form-control" v-model="customer.cedula">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" v-model="customer.email">
      </div>
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
      <div class="form-group">
        <label>Límite de crédito</label>
        <input type="number" class="form-control" v-model="customer.creditLimit">
      </div>
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
      <button 
      	class="btn btn-lg btn-primary btn-block" 
      	@click.prevent="submit" 
      	type="submit">

      	Guardar
      </button>
		</form>
	</div>
</template>

<script>
export default {
  data: function() {
  	return {
      months: [],
      years: [],
  		customer: {
        creditCard: {
          expirationDate: {}
        },
        active: false
      },
    };
  },
  beforeMount: function () {
    this.months = [];
    this.years = [];

    for (let x = 1; x <= 12; x++) {
      this.months.push(x);
    }
    let actualYear = new Date().getFullYear();
    let yearTop = actualYear + 10;
    for (let x = actualYear; x <= yearTop; x++) {
      this.years.push(x);
    }
  },
  methods: {
    submit: function () {
  		axios.post(
        '/customer', 
        this.customer
      ).then(res => {
  			this.$router.push({
  				name: 'customer-list'
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
<template>
	<div class="row">
    <Loading v-if="loading"/>
    <form class="col-md-4 col-md-offset-4" v-if="customers">
      <h2 class="form-signin-heading">Inspección previa renta</h2>
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
      	@click.prevent="submit" 
      	type="submit">

      	Guardar
      </button>
		</form>
	</div>
</template>

<script>

import Loading from '../generic/loading';

export default {
  components: {
    Loading
  },
  data: function() {
  	return {
      loading: true,
      inspection: {
        hasScratchs: false,
        hasJack: false,
        hasBrokenWindows: false,
        spareTire: false
      },
      customers: null
    };
  },
  mounted: function () {
    if (this.$route.params.id) {
      this.inspection.vehicle = this.$route.params.id;
    } else {
      this.$router.push({
        name: 'inspection-list'
      });
    }

    axios
      .get('/customer')
      .then(res => this.customers = res.data)
      .catch(console.error)
      .then(() => this.loading = false);
  },
  methods: {
    submit: function () {
  		axios.post(
        '/vehicle-inspection', 
        this.inspection
      ).then(res => {
  			this.$router.push({
  				name: 'rent-create',
          params: {
            id: res.data._id
          }
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
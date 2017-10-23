<template>
	<div>
		<div class="row">
		  	<form class="col-md-4 col-md-offset-4">
		        <h2 class="form-signin-heading">Agregar Modelo de vehículo</h2>
		        <label>Marca</label>
            <select v-model="model.brand">
              <option :value="undefined">Seleccione</option>
              <option v-for="brand in brands" :value="brand._id">
                {{ brand.description }}
              </option>
            </select>
            <label for="inputEmail" class="sr-only">Nombre</label>
		        <input type="text" v-model.trim="model.description" class="form-control" placeholder="Nombre" required="" autofocus="">
		        <label>
		        	<input type="checkbox" v-model="model.active" required=""> Activo
		        </label>
		        <button 
		        	class="btn btn-lg btn-primary btn-block" 
		        	@click.prevent="submit" 
		        	type="submit">

		        	Guardar
		        </button>
			</form>
		</div>
	</div>
</template>

<script>
export default {
  data: function() {
  	return {
      model: {},
      brands: []
    };
  },
  mounted: function () {
    axios
      .get('/vehicle-brand')
      .then(res => this.brands = res.data)
      .catch(console.error);
  },
  methods: {
  	submit: function () {
  		axios.post('/vehicle-model', this.model).then(res => {
  			this.$router.push({
  				name: 'model-list'
  			});
  		}).catch(err => {
  			console.error(err, 'here');
  		});
  	}
  }
}
</script>
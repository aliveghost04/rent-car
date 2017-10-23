<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Agregar Marca de vehículo</h2>
      <label for="inputEmail" class="sr-only">Nombre</label>
      <input type="text" v-model.trim="brand.description" class="form-control" placeholder="Nombre" required="" autofocus="">
      <label>
      	<input type="checkbox" v-model="brand.active" required=""> Activo
      </label>
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
  		brand: {}
  	};
  },
  mounted: function() {
  	if (this.$route.params && this.$route.params.id) {
  		axios
  			.get(`/vehicle-brand/${this.$route.params.id}`)
  			.then(res => this.brand = res.data)
  			.catch(console.error);
  	} else {
  		this.$router.replace({
  			name: 'brand-list'
  		});
  	}
  },
  methods: {
  	submit: function (event) {
  		axios.put(
        `/vehicle-brand/${this.brand._id}`, 
        this.vehicle
      ).then(res => {
  			this.$router.push({
  				name: 'brand-list'
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
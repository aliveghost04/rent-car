<template>
	<div class="row">
	  	<form class="col-md-4 col-md-offset-4">
	        <h2 class="form-signin-heading">Editar Modelo de vehículo</h2>
	        <label for="inputEmail" class="sr-only">Nombre</label>
	        <input type="text" v-model.trim="model.description" class="form-control" placeholder="Nombre" required="" autofocus="">
	        <label>
	        	<input type="checkbox" v-model="model.active" required=""> Activo
	        </label>
	        <button 
	        	class="btn btn-lg btn-primary btn-block" 
	        	v-on:click="submit" 
	        	type="submit">

	        	Guardar
	        </button>
		</form>
	</div>
</template>

<script>
export default {
  components: {
  },
  name: 'modelEdit',
  data: function() {
  	return {
  		model: {}
  	};
  },
  mounted: function() {
  	console.log(this.$router);
  	if (this.$route.params && this.$route.params.id) {
  		axios
  			.get(`/vehicle-model/${this.$route.params.id}`)
  			.then(res => this.model = res.data)
  			.catch(console.error);
  	} else {
  		this.$router.replace({
  			name: 'model-list'
  		});
  	}
  },
  methods: {
  	submit: function (event) {
  		event.preventDefault();
  		axios.put(`/vehicle-model/${this.model._id}`, {
  			description: this.model.description,
  			active: this.model.active
  		}).then(res => {
  			this.$router.push({
  				name: 'model-list'
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
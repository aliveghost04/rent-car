<template>
	<div>
		<Master/>
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
		        	v-on:click="submit" 
		        	type="submit">

		        	Guardar
		        </button>
			</form>
		</div>
	</div>
</template>

<script>
import Master from './Master.vue';

export default {
  components: {
  	Master
  },
  name: 'BrandEdit',
  data: function() {
  	return {
  		brand: {}
  	};
  },
  mounted: function() {
  	console.log(this.$router);
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
  		event.preventDefault();
  		axios.put(`/vehicle-brand/${this.brand._id}`, {
  			description: this.brand.description,
  			active: this.brand.active
  		}).then(res => {
  			this.$router.push({
  				name: 'brand-list'
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
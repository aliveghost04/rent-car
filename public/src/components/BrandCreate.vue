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
  name: 'Brand',
  data: function() {
  	return {
  		brand: {}
  	};
  },
  methods: {
  	submit: function (event) {
  		axios.post('/vehicle-brand', {
  			description: this.brand.description,
  			active: this.brand.active
  		}).then(res => {
  			this.$router.push({
  				name: 'brand-list'
  			});
  		}).catch(err => {
  			console.error(err, 'here');
  		});
  	}
  }
}
</script>
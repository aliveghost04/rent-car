<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Agregar tipo de vehículo</h2>
      <label for="inputEmail" class="sr-only">Nombre</label>
      <input type="text" v-model.trim="type.description" class="form-control" placeholder="Nombre" required="" autofocus="">
      <label>
      	<input type="checkbox" v-model="type.active" required=""> Activo
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
  data: function() {
  	return {
  		type: {}
  	};
  },
  methods: {
  	submit: function (event) {
  		axios.post('/vehicle-type', this.type).then(res => {
  			this.$router.push({
  				name: 'type-list'
  			});
  		}).catch(err => {
  			console.error(err, 'here');
  		});
  	}
  }
}
</script>
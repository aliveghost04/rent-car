<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Editar tipo de combustible</h2>
      <label for="inputEmail" class="sr-only">Nombre</label>
      <input type="text" v-model.trim="gasType.description" class="form-control" placeholder="Nombre" required="" autofocus="">
      <label>
      	<input type="checkbox" v-model="gasType.active" required=""> Activo
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
  		gasType: {}
  	};
  },
  mounted: function() {
  	if (this.$route.params && this.$route.params.id) {
  		axios
  			.get(`/gas-type/${this.$route.params.id}`)
  			.then(res => this.gasType = res.data)
  			.catch(console.error);
  	} else {
  		this.$router.replace({
  			name: 'gas-list'
  		});
  	}
  },
  methods: {
  	submit: function () {
  		axios.put(
        `/gas-type/${this.gasType._id}`, 
        this.gasType
      ).then(res => {
  			this.$router.push({
  				name: 'gas-list'
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
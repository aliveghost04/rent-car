<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Editar tipo de vehículo</h2>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Nombre</label>
        <input type="text" v-model.trim="type.description" class="form-control" placeholder="Nombre" required="" autofocus="">
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="type.active">
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
  		type: {}
  	};
  },
  mounted: function() {
  	if (this.$route.params && this.$route.params.id) {
  		axios
  			.get(`/vehicle-type/${this.$route.params.id}`)
  			.then(res => this.type = res.data)
  			.catch(console.error);
  	} else {
  		this.$router.replace({
  			name: 'type-list'
  		});
  	}
  },
  methods: {
  	submit: function () {
  		axios.put(
        `/vehicle-type/${this.type._id}`, 
        this.type
      ).then(res => {
  			this.$router.push({
  				name: 'type-list'
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
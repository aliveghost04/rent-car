<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Agregar tipo combustible</h2>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Nombre</label>
        <input type="text" v-model.trim="gasType.description" class="form-control" placeholder="Nombre" required="" autofocus="">
      </div>
      <div class="form-group">
        <label>Unidad de medida</label>
        <select v-model="gasType.mesure" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option value="gls">Galones / gls</option>
          <option value="m3s">Metros cúbicos / m3s</option>
        </select>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="gasType.active" required=""> Activo
        </label>
      </div>
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
  		gasType: {}
  	};
  },
  methods: {
  	submit: function (event) {
  		axios.post(
        '/gas-type', 
        this.gasType
      ).then(res => {
  			this.$router.push({
  				name: 'gas-list'
  			});
  		}).catch(err => {
  			console.error(err, 'here');
  		});
  	}
  }
}
</script>
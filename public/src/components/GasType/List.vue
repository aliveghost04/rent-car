<template>
	<div class="container">
		<div class="row">
		  	<table class="table">
		  		<thead>
		  			<th>Descripción</th>
		  			<th>Activa</th>
		  			<th>Acción</th>
		  		</thead>
		  		<tbody>
		  			<tr v-for="gasType in gasTypes">
			  			<td>{{ gasType.description }}</td>
			  			<td>
			  				<span v-if="gasType.active" class="glyphicon glyphicon-ok"></span>
			  				<span v-else class="glyphicon glyphicon-remove"></span>
			  			</td>
			  			<td>
			  				<router-link 
			  					:to="{ 
			  						name: 'gas-edit', 
			  						params: { 
			  							id: gasType._id 
			  						} 
			  					}"
			  					class="btn btn-warning">
			  					
			  					Editar
			  				</router-link>
			  				<!-- <button type="button" class="btn btn-warning">Editar</button> -->
			  				<button 
			  					type="button" 
			  					@click="eliminar(gasType)"
			  					class="btn btn-danger">
			  					
			  					Eliminar
			  				</button>
			  			</td>
		  			</tr>
		  		</tbody>
		  	</table>
		</div>
	</div>
</template>

<script>
export default {
  data: function() {
  	return {
  		gasTypes: []
  	};
  },
  mounted: function() {
  	axios
  		.get('/gas-type')
  		.then(res => this.gasTypes = res.data)
  		.catch(console.error);
  },
  methods: {
  	eliminar: function (gasType) {
  		if (confirm('¿Estás seguro que deseas eliminar este tipo de combustible?')) {
	  		axios.delete('/gas-type/' + gasType._id).then(res => {
	  			this.gasTypes.splice(this.gasTypes.findIndex(el => {
	  				return el._id === gasType._id;
	  			}), 1);
	  		});
	  	}
  	}
  }
}
</script>
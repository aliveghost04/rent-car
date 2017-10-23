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
		  			<tr v-for="type in types">
			  			<td>{{ type.description }}</td>
			  			<td>
			  				<span v-if="type.active" class="glyphicon glyphicon-ok"></span>
			  				<span v-else class="glyphicon glyphicon-remove"></span>
			  			</td>
			  			<td>
			  				<router-link 
			  					:to="{ 
			  						name: 'type-edit', 
			  						params: { 
			  							id: type._id 
			  						} 
			  					}"
			  					class="btn btn-warning">
			  					
			  					Editar
			  				</router-link>
			  				<!-- <button type="button" class="btn btn-warning">Editar</button> -->
			  				<button 
			  					type="button" 
			  					@click="eliminar(type)"
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
  		types: []
  	};
  },
  mounted: function() {
  	axios
  		.get('/vehicle-type')
  		.then(res => this.types = res.data)
  		.catch(console.error);
  },
  methods: {
  	eliminar: function (type) {
  		if (confirm('¿Estás seguro que deseas eliminar este tipo de vehículo?')) {
	  		axios.delete('/vehicle-type/' + type._id).then(res => {
	  			this.types.splice(this.types.findIndex(el => {
	  				return el._id === type._id;
	  			}), 1);
	  		});
	  	}
  	}
  }
}
</script>
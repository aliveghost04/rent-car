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
		  			<tr v-for="vehicle in vehicles">
			  			<td>{{ vehicle.description }}</td>
			  			<td>
			  				<span v-if="vehicle.active" class="glyphicon glyphicon-ok"></span>
			  				<span v-else class="glyphicon glyphicon-remove"></span>
			  			</td>
			  			<td>
			  				<router-link 
			  					:to="{ 
			  						name: 'vehicle-edit', 
			  						params: { 
			  							id: vehicle._id 
			  						} 
			  					}"
			  					class="btn btn-warning">
			  					
			  					Editar
			  				</router-link>
			  				<!-- <button type="button" class="btn btn-warning">Editar</button> -->
			  				<button 
			  					type="button" 
			  					@click="eliminar(vehicle)"
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
  		vehicles: []
  	};
  },
  mounted: function() {
  	axios
  		.get('/vehicle')
  		.then(res => this.vehicles = res.data)
  		.catch(console.error);
  },
  methods: {
  	eliminar: function (vehicle) {
  		if (confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
	  		axios.delete('/vehicle/' + vehicle._id).then(res => {
	  			this.vehicles.splice(this.vehicles.findIndex(el => {
	  				return el._id === vehicle._id;
	  			}), 1);
	  		});
	  	}
  	}
  }
}
</script>
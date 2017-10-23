<template>
	<div>
		<div class="container">
			<div class="row">
			  	<table class="table">
			  		<thead>
			  			<th>Marca</th>
			  			<th>Descripción</th>
			  			<th>Activa</th>
			  			<th>Acción</th>
			  		</thead>
			  		<tbody>
			  			<tr v-for="model in models">
				  			<td>{{ model.brand.description }}</td>
				  			<td>{{ model.description }}</td>
				  			<td>
				  				<span v-if="model.active" class="glyphicon glyphicon-ok"></span>
				  				<span v-else class="glyphicon glyphicon-remove"></span>
				  			</td>
				  			<td>
				  				<router-link 
				  					:to="{ 
				  						name: 'model-edit', 
				  						params: { 
				  							id: model._id 
				  						} 
				  					}"
				  					class="btn btn-warning">
				  					
				  					Editar
				  				</router-link>
				  				<!-- <button type="button" class="btn btn-warning">Editar</button> -->
				  				<button 
				  					type="button" 
				  					@click="eliminar(model)"
				  					class="btn btn-danger">
				  					
				  					Eliminar
				  				</button>
				  			</td>
			  			</tr>
			  		</tbody>
			  	</table>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  data: function() {
  	return {
  		models: []
  	};
  },
  mounted: function() {
  	axios
  		.get('/vehicle-model')
  		.then(res => this.models = res.data)
  		.catch(console.error);
  },
  methods: {
  	eliminar: function (model) {
  		if (confirm('¿Estás seguro que deseas eliminar este modelo?')) {
	  		axios.delete('/vehicle-model/' + model._id).then(res => {
	  			this.models.splice(this.models.findIndex(el => {
	  				return el._id === model._id;
	  			}), 1);
	  		});
	  	}
  	}
  }
}
</script>
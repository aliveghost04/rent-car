<template>
	<div class="container">
		<loading v-if="loading"/>
		<div class="row">
		  	<table class="table">
		  		<thead>
		  			<th>Descripción</th>
		  			<th>Activa</th>
		  			<th>Acción</th>
		  		</thead>
		  		<tbody>
		  			<tr v-for="customer in customers">
			  			<td>{{ customer.name }}</td>
			  			<td>
			  				<span v-if="customer.active" class="glyphicon glyphicon-ok"></span>
			  				<span v-else class="glyphicon glyphicon-remove"></span>
			  			</td>
			  			<td>
			  				<router-link 
			  					:to="{ 
			  						name: 'customer-edit', 
			  						params: { 
			  							id: customer._id 
			  						} 
			  					}"
			  					class="btn btn-warning">
			  					
			  					Editar
			  				</router-link>
			  				<!-- <button type="button" class="btn btn-warning">Editar</button> -->
			  				<button 
			  					type="button" 
			  					@click="eliminar(customer)"
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
import loading from '../generic/loading';

export default {
  components: {
  	loading
  },
  data: function() {
  	return {
  		customers: [],
  		loading: true
  	};
  },
  mounted: function() {
  	axios
  		.get('/customer')
  		.then(res => this.customers = res.data)
  		.catch(console.error)
  		.then(() => this.loading = false);
  },
  methods: {
  	eliminar: function (customer) {
  		if (confirm('¿Estás seguro que deseas eliminar este vehículo?')) {
	  		axios.delete('/customer/' + customer._id).then(res => {
	  			this.customers.splice(this.customers.findIndex(el => {
	  				return el._id === customer._id;
	  			}), 1);
	  		});
	  	}
  	}
  }
}
</script>
<template>
	<div>
		<Master/>
		<div class="container">
			<div class="row">
			  	<table class="table">
			  		<thead>
			  			<th>Descripción</th>
			  			<th>Activa</th>
			  			<th>Acción</th>
			  		</thead>
			  		<tbody>
			  			<tr v-for="brand in brands">
				  			<td>{{ brand.description }}</td>
				  			<td>
				  				<span v-if="brand.active" class="glyphicon glyphicon-ok"></span>
				  				<span v-else class="glyphicon glyphicon-remove"></span>
				  			</td>
				  			<td>
				  				<router-link 
				  					:to="{ 
				  						name: 'brand-edit', 
				  						params: { 
				  							id: brand._id 
				  						} 
				  					}"
				  					class="btn btn-warning">
				  					
				  					Editar
				  				</router-link>
				  				<!-- <button type="button" class="btn btn-warning">Editar</button> -->
				  				<button 
				  					type="button" 
				  					@click="eliminar(brand)"
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
import Master from './Master.vue';

export default {
  components: {
  	Master
  },
  name: 'BrandList',
  data: function() {
  	return {
  		brands: []
  	};
  },
  mounted: function() {
  	axios
  		.get('/vehicle-brand')
  		.then(res => this.brands = res.data)
  		.catch(console.error);
  },
  methods: {
  	eliminar: function (brand) {
  		if (confirm('¿Estás seguro que deseas eliminar esta marca?')) {
	  		axios.delete('/vehicle-brand/' + brand._id).then(res => {
	  			this.brands.splice(this.brands.findIndex(el => {
	  				return el._id === brand._id;
	  			}), 1);
	  		});
	  	}
  	}
  }
}
</script>
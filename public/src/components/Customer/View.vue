<template>
	<div class="container-fluid">
		<loading v-if="loading"/>
		<div class="row" v-if="vehicle">
			<ol class="breadcrumb">
				<router-link tag="li" :to="{
					name: 'home'
				}">
					<a>Inicio</a>
				</router-link>
				<router-link tag="li" :to="{
					name: 'vehicle-list'
				}">
					<a>Vehiculos</a>
				</router-link>
				<li class="active">{{ vehicle._id }}</li>
			</ol>

		  	<div class="col-md-6">
		  		<div id="vehicle-images" class="carousel slide" data-ride="carousel">
		  			<div class="carousel-inner">
		  				<div class="item" v-for="(image, index) in vehicle.images" :class="{ active: index === 0 }">
		  					<img :src="image.path" alt="Vehículo">
		  				</div>
		  			</div>
			  		
			  		<a class="left carousel-control" href="#vehicle-images" role="button" data-slide="prev">
					    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					</a>
					<a class="right carousel-control" href="#vehicle-images" role="button" data-slide="next">
					    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					</a>
		  		</div>
		  	</div>

		  	<div class="col-md-6">
		  		<h3>{{ vehicle.brand.description }} {{ vehicle.model.description }}</h3>
		  		<ul>
		  			<li><strong>Año:</strong> {{ vehicle.manufactureYear }}</li>
		  			<li><strong>Combustible:</strong> {{ vehicle.gasType.description }}</li>
		  			<li><strong>Cantidad de ruedas:</strong> {{ vehicle.wheels }}</li>
		  		</ul>
		  	</div>
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
  		loading: false,
  		vehicle: null
  	};
  },
  mounted: function() {
  	this.loading = true;
  	axios
  		.get(`/vehicle/${this.$route.params.id}`)
  		.then(res => {
  			this.vehicle = res.data;
  		})
  		.catch(console.error)
  		.then(() => {
  			this.loading = false;
  		});
  },
  methods: {
  	submit: function (event) {
  		axios.post('/vehicle-brand', {
  			description: this.brand.name,
  			active: this.brand.active
  		});
  	}
  }
}
</script>

<style>
	.item img {
		display: block;
		margin: 0 auto;
	}
</style>
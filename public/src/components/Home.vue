<template>
	<div>
		<Loading v-if="loading"/>
		<div class="row" v-if="vehicles">
	      <div class="col-md-3" v-for="vehicle in vehicles">
	        <div class="thumbnail text-center">
	          <img 
	            v-if="vehicle.images.length > 0" 
	            :src="vehicle.images.shift()" 
	            alt="...">
	          <span v-else class="glyphicon glyphicon-picture no-image"></span>
	          <div class="caption">
	            <h3>{{ vehicle.description }}</h3>
	            <p>Año: {{ vehicle.manufactureYear }}</p>
	            <p>
	              <router-link 
	                :to="{ name: 'vehicle-view', params: { id: vehicle._id }}" 
	                class="btn btn-default">
	                  Detalles
	              </router-link>
	              <!-- <a href="#" class="btn btn-default" role="button">Detalles</a> -->
	              <!-- <a href="#" class="btn btn-primary" role="button">Rentar</a> -->
	              <router-link 
	              	:to="{ name: 'inspect-create', params: { id: vehicle._id } }"
					class="btn btn-primary">
					Rentar
				  </router-link>
	            </p>
	          </div>
	        </div>
	      </div>
	    </div>
    </div>
</template>

<script type="text/javascript">
	
	import Loading from './generic/loading';

	export default {
		components: {
			Loading
		},
		data: function () {
			return {
				loading: true,
				vehicles: null
			}
		},
		mounted() {
		    axios
		    	.get('/vehicle')
		    	.then(response => this.vehicles = response.data)
		    	.catch(console.error)
		    	.then(() => this.loading = false);
		}
  	}
</script>
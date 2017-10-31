<template>
	<div>
		<div class="row">
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
	              <a href="#" class="btn btn-primary" role="button">Rentar</a>
	            </p>
	          </div>
	        </div>
	      </div>
	    </div>
    </div>
</template>

<script type="text/javascript">
	export default {
		data: function () {
			return {
				vehicles: []
			}
		},
		mounted() {
		    axios.get('/vehicle').then(response => this.vehicles = response.data);
		}
  	}
</script>
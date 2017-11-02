<template>
	<div class="row">
    <Loading v-if="loading"/>
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Rentar vehículo</h2>
      <div class="form-group">
        <label>Fecha esperada de retorno</label>
        <input type="date" class="form-control" v-model="rent.returnDate">
      </div>
      <div class="form-group">
        <label>Costo por día</label>
        <input type="number" class="form-control" v-model="rent.costPerDay">
      </div>
      <div class="form-group">
        <div class="form-group">
        <label>Comentario</label>
        <textarea class="form-control" v-model="rent.comment"></textarea>
      </div>
      </div>
      <button 
      	class="btn btn-lg btn-primary btn-block" 
      	@click.prevent="submit" 
      	type="submit">

      	Guardar
      </button>
		</form>
	</div>
</template>

<script>

import Loading from '../generic/loading';

export default {
  components: {
    Loading
  },
  data: function() {
  	return {
      loading: true,
      rent: {}
    };
  },
  mounted: function () {
    if (this.$route.params.id) {
      this.rent.inspection = this.$route.params.id;
    } else {
      this.$router.replace({
        name: 'rent-list'
      });
    }

    axios
      .get(
        `/vehicle-inspection/${this.$route.params.id}`, {
          params: {
            '$select': ['vehicle']
          }
        }
      ).then(res => {
        return axios.get(
          `/vehicle/${res.data.vehicle}`, {
          params: {
            $select: ['costPerDay']
          }
        })
      })
      .then(res => this.rent.costPerDay = res.data.costPerDay)
      .catch(console.error)
      .then(() => this.loading = false);
  },
  methods: {
    submit: function () {
  		axios.post(
        '/rent', 
        this.rent
      ).then(res => {
  			this.$router.push({
  				name: 'rent-list'
  			});
  		}).catch(console.error);
  	}
  }
}
</script>
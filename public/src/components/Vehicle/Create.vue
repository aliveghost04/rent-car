<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Agregar vehículo</h2>
      <div class="form-group">
        <label>Marca</label>
        <select v-model="vehicle.brand" class="form-control" @change.prevent="setModels">
          <option :value="undefined">Seleccione</option>
          <option v-for="brand in brands" :value="brand._id">
            {{ brand.description }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Modelo</label>
        <select v-model="vehicle.model" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="model in models" :value="model._id">
            {{ model.description }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Combustible</label>
        <select v-model="vehicle.gasType" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="gasType in gasTypes" :value="gasType._id">
            {{ gasType.description }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Tipo</label>
        <select v-model="vehicle.vehicleType" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="type in types" :value="type._id">
            {{ type.description }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="sr-only">Número de Chasis</label>
        <input type="text" v-model.trim="vehicle.chasisNumber" class="form-control" placeholder="Número de chasis" required="">
      </div>
      <div class="form-group">
        <label class="sr-only">Número de motor</label>
        <input type="text" v-model.trim="vehicle.engineNumber" class="form-control" placeholder="Número de motor" required="">
      </div>
      <div class="form-group">
        <label class="sr-only">Número de placa</label>
        <input type="text" v-model.trim="vehicle.plateNumber" class="form-control" placeholder="Número de placa" required="">
      </div>
      <div class="form-group">
        <label>Año de fabricación</label>
        <select v-model="vehicle.manufactureYear" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="year in years" :value="year">
            {{ year }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Cantidad de ruedas</label>
        <select v-model="vehicle.wheels" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option v-for="wheel in wheels" :value="wheel">
            {{ wheel }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label class="sr-only">Costo por día</label>
        <input type="number" v-model.number="vehicle.costPerDay" class="form-control" placeholder="Costo por día" required="">
      </div>
      <div class="form-group">
        <label class="sr-only">Nombre</label>
        <textarea v-model.trim="vehicle.description" class="form-control" placeholder="Descripción" required=""></textarea>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="vehicle.active" required="">
          Activo
        </label>
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
export default {
  data: function() {
  	return {
  		vehicle: {
        active: false
      },
      brands: [],
      models: [],
      gasTypes: [],
      types: []
  	};
  },
  mounted: function () {
    let years = [];
    let wheels = [];
    let actualYear = new Date().getFullYear();
    for (let x = actualYear; x >= 1980; x--) {
      years.push(x);
    }

    for (let x = 1; x <= 10; x++) {
      wheels.push(x);
    }

    this.wheels = wheels;
    this.years = years;
    axios
      .get('/vehicle-brand')
      .then(res => this.brands = res.data)
      .catch(console.error);
   axios
      .get('/gas-type')
      .then(res => this.gasTypes = res.data)
      .catch(console.error);
    axios
      .get('/vehicle-type')
      .then(res => this.types = res.data)
      .catch(console.error);
  },
  methods: {
    setModels: function () {
      if (this.vehicle.brand) {
         axios
          .get('/vehicle-model', {
            params: {
              brand: this.vehicle.brand
            }
          })
          .then(res => {
            this.models = res.data;
            this.vehicle.model = undefined;
          })
          .catch(console.error);
      } else {
        this.models = [];
        this.vehicle.model = undefined;
      }
    },
  	submit: function () {
  		if (this.vehicle) {
        if (this.vehicle.active) {
          this.vehicle.status = 'active';
        } else {
          this.vehicle.status = 'inactive';
        }
        delete this.vehicle.active;
      } 
      axios.post(
        '/vehicle', 
        this.vehicle
      ).then(res => {
  			this.$router.push({
  				name: 'vehicle-list'
  			});
  		}).catch(err => {
  			console.error(err, 'here');
        if (this.vehicle.status === 'active') {
          this.vehicle.active = true;
        } else if (this.vehicle) {
          this.vehicle.active = false;
        }
        delete this.vehicle.status;
  		});
  	}
  }
}
</script>
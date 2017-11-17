<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form v-if="vehicle">
      <div class="col-md-6">
        <div class="form-group">
          <label>Marca</label>
          <select v-model="vehicle.brand._id" class="form-control" @change.prevent="setModels">
            <option :value="undefined">Seleccione</option>
            <option v-for="brand in brands" :value="brand._id">
              {{ brand.description }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Modelo</label>
          <select v-model="vehicle.model._id" class="form-control">
            <option :value="undefined">Seleccione</option>
            <option v-for="model in models" :value="model._id">
              {{ model.description }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Combustible</label>
          <select v-model="vehicle.gasType._id" class="form-control">
            <option :value="undefined">Seleccione</option>
            <option v-for="gasType in gasTypes" :value="gasType._id">
              {{ gasType.description }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Tipo</label>
          <select v-model="vehicle.vehicleType._id" class="form-control">
            <option :value="undefined">Seleccione</option>
            <option v-for="type in types" :value="type._id">
              {{ type.description }}
            </option>
          </select>
        </div>
        <fg-input type="text"
          v-model="vehicle.chasisNumber"
          label="Número de chasis"
          title="Número de chasis">
        </fg-input>
        <fg-input type="text"
          v-model="vehicle.engineNumber"
          label="Número de motor"
          title="Número de motor">
        </fg-input>
      </div>
      <div class="col-md-6">
        <fg-input type="text"
          v-model="vehicle.plateNumber"
          label="Número de placa"
          title="Número de placa">
        </fg-input>
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
        <fg-input type="number"
          v-model.number="vehicle.costPerDay"
          label="Costo por día"
          title="Costo por día">
        </fg-input>
        <div class="form-group">
          <label>Descripción</label>
          <textarea v-model.trim="vehicle.description" 
            rows="3"
            class="form-control border-input" 
            placeholder="Descripción" 
            required=""></textarea>
        </div>
        <div class="form-group" 
          v-if="vehicle.status === 'inactive' || 
            vehicle.status === 'active'">
          
          <label>
            <input type="checkbox" v-model="vehicle.active" required="">
            Activo
          </label>
        </div>
      </div>
      <div class="col-md-6 col-md-offset-3">
        <button 
          class="btn btn-lg btn-primary btn-block" 
          @click.prevent="save" 
          type="submit">

          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script>

import Loading from 'src/components/UIComponents/Loading'
import VehicleBrandService from 'src/services/vehicle-brand'
import VehicleModelService from 'src/services/vehicle-model'
import VehicleTypeService from 'src/services/vehicle-type'
import VehicleService from 'src/services/vehicles'
import GasTypeService from 'src/services/gas-type'

export default {
  components: {
    Loading
  },
  data: function () {
    return {
      loading: true,
      vehicle: null,
      brands: [],
      models: [],
      gasTypes: [],
      types: [],
      years: [],
      wheels: []
    }
  },
  mounted: function () {
    let years = []
    let wheels = []
    let actualYear = new Date().getFullYear()
    for (let x = actualYear; x >= 1980; x--) {
      years.push(x)
    }

    for (let x = 1; x <= 10; x++) {
      wheels.push(x)
    }

    this.wheels = wheels
    this.years = years
    let brands = VehicleBrandService
      .getAll()

    let models = VehicleModelService
      .getAll()

    let gas = GasTypeService
      .getAll()

    let types = VehicleTypeService
      .getAll()

    let vehicle = VehicleService
      .get(this.$route.params.id)

    Promise.all([
      brands,
      models,
      gas,
      types,
      vehicle
    ])
    .then(response => {
      let [brands, models, gas, types, vehicle] = response
      this.brands = brands
      this.models = models
      this.gasTypes = gas
      this.types = types
      this.vehicle = vehicle
      if (vehicle.status === 'active') {
        vehicle.active = true
      } else if (vehicle.status === 'inactive') {
        vehicle.active = false
      }
    })
    .catch(console.error)
    .then(() => {
      this.loading = false
    })
  },
  methods: {
    setModels: function () {
      if (this.vehicle.brand) {
        VehicleModelService
          .getAll({
            brand: this.vehicle.brand
          })
          .then(res => {
            this.models = res
            this.vehicle.model = undefined
          })
         .catch(console.error)
      } else {
        this.models = []
        this.vehicle.model = undefined
      }
    },
    save: function () {
      VehicleService
        .update(this.vehicle)
        .then(res => {
          this.$router.push({
            name: 'vehicle-list'
          })
        })
        .catch(console.error)
    }
  }
}
</script>

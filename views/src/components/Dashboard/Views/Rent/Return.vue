<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <form>
      <div class="col-md-6 col-md-offset-3">
        <div class="alert alert-warning" v-if="rent.daysDelay > 0">
          Este vehículo tiene <strong>{{ rent.daysDelay}}</strong> 
          de atraso. 
          <strong>Será cobrado un monto de recargo</strong>
        </div>
        <fg-input type="number"
          v-model.number="rent.gasAmount"
          label="Monto por concepto de combustible"
          placeholder="RD$">
        </fg-input>
        <fg-input type="number"
          v-model.number="rent.damageAmount"
          label="Monto por concepto de daños"
          placeholder="RD$">
        </fg-input>
        <fg-input type="number"
          v-if="rent.daysDelay > 0"
          v-model.number="rent.surcharge"
          label="Monto por recargo"
          placeholder="RD$">
        </fg-input>
        <div class="form-group">
          <label>
            Monto por días de atraso: <strong>RD$ {{ rent.delayAmount }}</strong>
          </label>
        </div>
        <div class="form-group">
          <label>
            Total extra a pagar: <strong>RD$ {{ total }}</strong>
          </label>
        </div>
        <button type="button" 
          @click.prevent="save" 
          class="btn btn-info btn-lg btn-block">
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>

<script type="text/javascript">
  
  import Loading from 'src/components/UIComponents/Loading'
  import RentService from 'src/services/rent'

  export default {
    components: {
      Loading
    },
    data: function () {
      return {
        loading: true,
        rent: {
          gasAmount: 0,
          damageAmount: 0,
          surcharge: 0,
          delayAmount: 0,
          daysDelay: 0
        }
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        RentService
          .getDaysDelayAmount(this.$route.params.id)
          .then(delay => {
            this.rent.delayAmount = delay.daysDelayAmount
            this.rent.daysDelay = delay.daysDelay
          })
          .catch(console.error)
          .then(() => {
            this.loading = false
          })
      } else {
        this.$notifications.notify({
          message: 'Id de vehículo inválido',
          horizontalAlign: 'right',
          verticalAlign: 'bottom',
          type: 'danger'
        })
        this.$router.replace({
          name: 'rent-list'
        })
      }
    },
    computed: {
      total: function () {
        return Number(this.rent.delayAmount) +
          Number(this.rent.surcharge) +
          Number(this.rent.gasAmount) +
          Number(this.rent.damageAmount) ||
          0
      }
    }
  }
</script>

<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <div class="col-md-12">
      <div>
        <search :options="searchOptions" @search="search"/>
        <router-link 
          :to="{ name: 'customer-add' }" 
          class="btn btn-primary add-button">

          Agregar
        </router-link>
      </div>
      <div class="card" v-if="customers.length > 0">
        <div class="header">
          <slot name="header">
            <h4 class="title">Listado de Clientes</h4>
          </slot>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-stripped">
            <thead>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Límite de crédito</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              <tr v-for="customer in customers" :key="customer.id">
                <td>{{ customer.name }}</td>
                <td>{{ customer.cedula | formatCedula }}</td>
                <td>RD$ {{ customer.creditLimit }}</td>
                <td>{{ customer.type }}</td>
                <td>
                  <i class="ti-check text-success" 
                    v-if="customer.active"
                    title="Activo">
                  </i>
                  <i class="ti-close text-warning" 
                    v-if="!customer.active"
                    title="Inactivo">
                  </i>
                </td>
                <td>
                  <router-link :to="{
                    name: 'customer-edit',
                    params: {
                      id: customer.id
                    }
                  }" class="btn btn-warning">
                    <i class="ti-pencil"></i>
                  </router-link>
                  <button type="button"
                    class="btn btn-danger" 
                    @click.prevent="remove(customer.id)">
                    <i class="ti-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="alert alert-info" v-if="customers.length === 0">
        No hay clientes para mostrar
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Loading from 'src/components/UIComponents/Loading'
  import Search from 'src/components/UIComponents/Search'
  import CustomerService from 'src/services/customer'

  export default {
    components: {
      Loading,
      Search
    },
    data: function () {
      return {
        searchOptions: [{
          label: 'Nombre',
          value: 'name'
        }, {
          label: 'Cédula',
          value: 'cedula'
        }, {
          label: 'Email',
          value: 'email'
        }],
        loading: true,
        customers: []
      }
    },
    methods: {
      remove: function (id) {
        this.$swal({
          title: 'Confirmar',
          icon: 'warning',
          text: '¿Estás seguro que quieres eliminar este cliente?',
          dangerMode: true,
          buttons: true
        }).then(deleteIt => {
          if (deleteIt) {
            CustomerService
              .delete(id)
              .then(res => {
                this.$notifications.notify({
                  message: 'El cliente ha sido eliminado exitosamente',
                  type: 'success',
                  icon: 'ti-check',
                  horizontalAlign: 'right',
                  verticalAlign: 'bottom'
                })

                this.customers = this
                  .customers
                  .filter(customer => customer.id !== id)
              }).catch(console.error)
          }
        })
      },
      search: function (search) {
        this.loading = true

        CustomerService
          .getAll({
            q: search.text,
            field: search.type
          }, true)
          .then(customers => {
            this.customers = customers
          })
          .catch(console.error)
          .then(() => {
            this.loading = false
          })
      }
    },
    mounted: function () {
      CustomerService
        .getAll({}, true)
        .then(customers => {
          this.customers = customers
        })
        .catch(console.error)
        .then(() => {
          this.loading = false
        })
    },
    filters: {
      formatCedula: function (value) {
        let cedula = value.split('')
        cedula.splice(3, 0, '-')
        cedula.splice(-1, 0, '-')
        return cedula.join('')
      }
    }
  }
</script>

<style type="text/css">
  .add-button {
    float: right;
  }
</style>

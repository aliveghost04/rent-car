<template>
  <div class="row">
    <loading :isLoading="loading"/>
    <div class="col-md-12">
      <div>
        <search :options="searchOptions" @search="search"/>
        <router-link 
          :to="{ name: 'employee-add' }" 
          class="btn btn-primary add-button">

          Agregar
        </router-link>
      </div>
      <div class="card" v-if="employees.length > 0">
        <div class="header">
          <slot name="header">
            <h4 class="title">Listado de empleados</h4>
          </slot>
        </div>
        <div class="content table-responsive table-full-width">
          <table class="table table-stripped">
            <thead>
              <th>Nombre</th>
              <th>Cédula</th>
              <th>Correo electrónico</th>
              <th>Jornada</th>
              <th>Estado</th>
              <th>Acciones</th>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.id">
                <td>{{ employee.name }}</td>
                <td>{{ employee.cedula | formatCedula }}</td>
                <td>{{ employee.email }}</td>
                <td>{{ employee.journeyText }}</td>
                <td>
                  <i class="ti-check text-success" 
                    v-if="employee.status === 'active'"
                    title="Activo">
                  </i>
                  <i class="ti-close text-warning" 
                    v-if="employee.status === 'inactive'"
                    title="Inactivo">
                  </i>
                  <i class="ti-lock text-danger" 
                    v-if="employee.status === 'blocked'"
                    title="Bloqueado">
                  </i>
                </td>
                <td>
                  <router-link :to="{
                    name: 'employee-edit',
                    params: {
                      id: employee._id
                    }
                  }" class="btn btn-warning">
                    <i class="ti-pencil"></i>
                  </router-link>
                  <button type="button"
                    class="btn btn-danger" 
                    @click.prevent="remove(employee.id)">
                    <i class="ti-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="alert alert-info" v-if="employees.length === 0">
        No hay empleados para mostrar
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Loading from 'src/components/UIComponents/Loading'
  import Search from 'src/components/UIComponents/Search'
  import UserService from 'src/services/user'

  export default {
    components: {
      Loading,
      Search
    },
    data: function () {
      return {
        loading: true,
        employees: [],
        searchOptions: [{
          label: 'Email',
          value: 'email'
        }, {
          label: 'Nombre',
          value: 'name'
        }, {
          label: 'Cédula',
          value: 'cedula'
        }]
      }
    },
    methods: {
      remove: function (id) {
        this.$swal({
          title: 'Confirmar',
          icon: 'warning',
          text: '¿Estás seguro que quieres eliminar este empleado?',
          dangerMode: true,
          buttons: true
        }).then(deleteIt => {
          if (deleteIt) {
            UserService
              .delete(id)
              .then(res => {
                this.$notifications.notify({
                  message: 'El empleado ha sido eliminado exitosamente',
                  type: 'success',
                  icon: 'ti-check',
                  horizontalAlign: 'right',
                  verticalAlign: 'bottom'
                })

                this.employees = this
                  .employees
                  .filter(employee => employee.id !== id)
              }).catch(console.error)
          }
        })
      },
      search: function (searchTerm) {
        this.loading = true

        UserService
          .getAll({
            q: searchTerm.text,
            field: searchTerm.type
          }, true)
          .then(employees => {
            this.employees = employees
          })
          .catch(console.error)
          .then(() => {
            this.loading = false
          })
      }
    },
    mounted: function () {
      UserService
        .getAll({}, true)
        .then(employees => {
          this.employees = employees
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
    margin-bottom: 10px;
  }
</style>

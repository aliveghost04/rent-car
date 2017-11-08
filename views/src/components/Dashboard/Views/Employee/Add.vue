<template>
  <div class="row">
    <form>
      <div class="col-md-6">
        <fg-input type="text"
          v-model.trim="employee.name"
          label="Nombre"
          title="Nombre">
        </fg-input>
        <fg-input type="number"
          v-model.number="employee.cedula"
          label="Cédula"
          title="Cédula">
        </fg-input>
        <fg-input type="password"
          v-model="employee.password"
          label="Contraseña"
          title="Contraseña">
        </fg-input>
        <fg-input type="email"
          v-model.trim="employee.email"
          label="Email"
          title="Email">
        </fg-input>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>Tanda</label>
          <select v-model="employee.journey" class="form-control">
            <option :value="undefined">Seleccione</option>
            <option value="morning">Mañana</option>
            <option value="evening">Tarde</option>
            <option value="nocturnal">Noche</option>
          </select>
        </div>
        <fg-input type="number"
          v-model="employee.comission"
          label="Comisión"
          title="Comisión">
        </fg-input>
        <div class="form-group">
          <label>Tipo de usuario</label>
          <select v-model="employee.level" class="form-control">
            <option :value="undefined">Seleccione</option>
            <option value="admin">Administrador</option>
            <option value="employee">Empleado</option>
          </select>
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="employee.active" value="active">
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

<script type="text/javascript">

  import UserService from 'src/services/user'

  export default {
    data: function () {
      return {
        employee: {}
      }
    },
    methods: {
      save: function () {
        UserService
          .save(this.employee)
          .then(res => {
            this.$router.push({
              name: 'employee-list'
            })
          })
          .catch(console.error)
      }
    }
  }
</script>

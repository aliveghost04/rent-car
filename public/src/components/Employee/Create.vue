<template>
	<div class="row">
  	<form class="col-md-4 col-md-offset-4">
      <h2 class="form-signin-heading">Agregar empleado</h2>
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" class="form-control" v-model="employee.name">
      </div>
      <div class="form-group">
        <label>Cédula</label>
        <input type="text" class="form-control" v-model="employee.cedula">
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input type="password" class="form-control" v-model="employee.password">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" v-model="employee.email">
      </div>
      <div class="form-group">
        <label>Tanda</label>
        <select v-model="employee.journey" class="form-control">
          <option :value="undefined">Seleccione</option>
          <option value="morning">Mañana</option>
          <option value="evening">Tarde</option>
          <option value="nocturnal">Noche</option>
        </select>
      </div>
      <div class="form-group">
        <label>Comisión</label>
        <input type="text" class="form-control" v-model="employee.comission">
      </div>
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
      employee: {
        active: false
      },
    };
  },
  methods: {
    submit: function () {
  		if (this.employee.active) {
        this.employee.active = 'active';
      } else {
        this.employee.active = 'inactive';
      }

      axios.post(
        '/user', 
        this.employee
      ).then(res => {
  			this.$router.push({
  				name: 'employee-list'
  			});
  		}).catch(err => {
        console.error(err);
        if (this.employee.active === 'active') {
          this.employee.active = true;
        } else {
          this.employee.active = false;
        }
      });
  	}
  }
}
</script>
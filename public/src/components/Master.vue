<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link :to="{ name: 'home'}" class="navbar-brand">Rent Car</router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li><a href="#"></a></li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              Vehículos <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <router-link tag="li" :to="{ name: 'vehicle-add' }">
                <a>Agregar</a>
              </router-link>
              <!-- <router-link tag="li" :to="{ name: 'vehicle-list' }">
                <a>Listado</a>
              </router-link> -->
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              Marcas <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <router-link tag="li" :to="{ name: 'brand-create' }">
                <a>Agregar</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'brand-list' }">
                <a>Listado</a>
              </router-link>
            </ul>
          </li>
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
              Modelos <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <router-link tag="li" :to="{ name: 'model-create' }">
                <a>Agregar</a>
              </router-link>
              <router-link tag="li" :to="{ name: 'model-list' }">
                <a>Listado</a>
              </router-link>
            </ul>
          </li>
        </ul>
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Búsqueda">
          </div>
          <button type="submit" class="btn btn-default">Buscar</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Link</a></li>
          <li class="dropdown">
            <a href="#" 
              class="dropdown-toggle" 
              data-toggle="dropdown" 
              role="button" 
              aria-haspopup="true" 
              aria-expanded="false">
              {{ storedUser.name }}
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Cambiar contraseña</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#" v-on:click="logout">Cerrar sesión</a></li>
            </ul>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
export default {
  name: 'Master',
  data: function() {
    return {
      storedUser: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
  	submit: function (event) {
  		axios.post('/login', {
  			email: this.user.email,
  			password: this.user.password
  		});
  	},
    logout: function (event) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.$router.replace({ 
        name: 'login'
      })
      event.preventDefault();
    }
  }
}
</script>

<style type="text/css">
  .no-image {
    font-size: 10em;
  }
</style>
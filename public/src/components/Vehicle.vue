<template>
	<div class="row">
	  	<form class="col-md-4 col-md-offset-4">
	        <h2 class="form-signin-heading">Iniciar Sesión</h2>
	        <label for="inputEmail" class="sr-only">Email address</label>
	        <input type="email" v-model="user.email" class="form-control" placeholder="Email address" required="" autofocus="">
	        <label for="inputPassword" class="sr-only">Password</label>
	        <input type="password" v-model="user.password" class="form-control" placeholder="Password" required="">
	        <button class="btn btn-lg btn-primary btn-block" v-on:click="submit" type="submit">Iniciar Sesión</button>
		</form>
	</div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
  	submit: function (event) {
  		axios.post('/login', {
  			email: this.user.email,
  			password: this.user.password
  		});
  	}
  }
}
</script>
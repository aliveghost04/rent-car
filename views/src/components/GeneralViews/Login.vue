<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4">
     <div class="login">
       <div class="card">
        <div class="header">
          <h4 class="title">Iniciar Sesión</h4>
        </div>
        <div class="content">
          <form>
           <fg-input type="text"
               label="Cédula ó Email"
               placeholder="Cédula ó Email"
               v-model="user.email">
           </fg-input>
           <fg-input type="password"
               label="Contraseña"
               placeholder="Contraseña"
               v-model="user.password">
           </fg-input>
           <div class="text-center">
             <button type="submit" 
               class="btn btn-info btn-fill btn-wd"
               @click.prevent="login">
              Iniciar Sesión
             </button>
           </div>
           <!-- <div class="form-group"> -->
           <div class="alert alert-danger" 
                v-text="error"
                v-if="error">
           </div>
           <!-- </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
import authenticationService from 'src/services/authentication'

export default {
  data: function () {
    return {
      user: {
        email: '',
        password: ''
      },
      error: false
    }
  },
  methods: {
    login: function () {
      authenticationService.login(this.user).then(res => {
        this.$router.replace({
          name: 'home'
        })
      }).catch(console.error)
    }
  }
}
</script>

<style>
  .login {
    margin-top: 50%;
    transform: translateY(-50%);
  }
</style>

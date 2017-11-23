<template>
  <form class="form-inline">
    <fg-input type="text"
      v-model="search.text"
      label="Búsqueda">
    </fg-input>
    <select v-model="search.type" 
      class="form-control">
      <option :value="undefined">Seleccione</option>
      <option v-for="option 
        in options" 
        :value="option.value">
        
        {{ option.label }}
      </option>
    </select>
    <button type="button" 
      class="btn btn-info"
      @click.prevent="submit">

      Buscar
    </button>
  </form>
</template>

<script type="text/javascript">
  export default {
    props: {
      options: Array
    },
    data: function () {
      return {
        search: {
          text: ''
        }
      }
    },
    methods: {
      submit: function () {
        if (this.search.type) {
          this.$emit('search', this.search)
        }
      }
    }
  }
</script>

<style type="text/css">
  form {
    display: inline-block;
    margin-bottom: 10px;
  }
</style>

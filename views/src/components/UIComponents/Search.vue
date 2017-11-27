<template>
  <form class="form-inline">
    <div class="form-group" v-if="selected.type === 'select'">
      <label>Criterio</label>
      <select v-model="search.text" 
        class="form-control"
        @change="submit">
        <option :value="''">
          Seleccione
        </option>
        <option v-for="option in selected.options"
          :value="option.value">

          {{ option.label }}
        </option>
      </select>
    </div>
    <div class="form-group" v-else>
      <label>Búsqueda</label>
      <input type="text" v-model="search.text" 
        class="form-control border-input"
        @keyup.enter="submit"
        :disabled="!search.type">
    </div>
    <div class="form-group">
      <label>Campo</label>
      <select v-model="search.type" 
        class="form-control"
        @change="change"
        :disabled="options.length === 1">

        <option :value="undefined">-- Sin Filtro --</option>
        <option v-for="option 
          in options" 
          :value="option.value">
          
          {{ option.label }}
        </option>
      </select>
    </div>
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
        },
        selected: {}
      }
    },
    methods: {
      change: function (e) {
        this.selected = this
          .options
          .find(el => el.value === e.target.value)
      },
      submit: function () {
        if (!this.search.type) {
          this.search.text = ''
        }

        this.$emit('search', this.search)
      }
    },
    created: function () {
      if (this.options.length === 1) {
        this.search.type = this.options[0].value
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

<template lang="html">
    <div class="card-body" v-if="isArray || isObj">
      <div class="card">
        <div class="card-header">
          {{title}}
        </div>
        <div class="card-block">
          <ObjViewer :title="k" :data="v" v-for="(v, k) in rData" :key="this._uid"/>
        </div>
      </div>
    </div>
    <div class="input-group" v-else>
      <span class="input-group-addon col-4">{{title}}</span>
      <span class="form-control">{{data}}</span>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'ObjViewer',
  props: {
    title: String,
    data: [Object, Array]
  },
  computed: {
    rData() {
      if (_.isString(this.data)) {
        try {
          return JSON.parse(this.data)
        } catch (e) {
          return this.data
        }
      }
      return this.data
    }
  },
  computed: {
    isArray() {
      return _.isArrayLikeObject(this.rData)
    },
    isObj() {
      return _.isPlainObject(this.rData)
    }
  }
}
</script>

<style lang="css">
</style>

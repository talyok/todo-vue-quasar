<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <q-list-header>TO DO's</q-list-header>
      <q-input
        v-model="toDo"
        placeholder="Add new To Do..."
        :after="[
          {
            icon: 'add',
            handler () {
              create()
            }
          }
        ]"
      />

      <q-item tag="label" v-for="(v, i) of toDos" :key="i" class="full-width">
        <q-item-side>
          <q-checkbox v-model="v.complete" />
        </q-item-side>
        <q-item-main>
          <q-item-tile label>
            {{ v.title }}
            <q-btn
              small
              color="negative"
              icon="delete"
              class="float-right"
              @click="del(v)">
              Delete
            </q-btn>
          </q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
    <div class="full-width text-center">
      <q-chip color="primary">
        <template v-if="toDos.length > 0">
          You have completed {{ summary }}.
        </template>
        <template v-if="toDos.length === 0">
          You have no To Do's.
        </template>
      </q-chip>
    </div>
  </div>
</template>

<script>
import Service from '../service'
import { Toast, Dialog } from 'quasar'
import _ from 'lodash'

export default {
  data () {
    return {
      toDos: [],
      toDo: '',
      sum: 0
    }
  },

  created () {
    let _this = this
    Service.get()
      .then((res) => {
        console.log('res: ', res)
        _this.toDos = res.data
      })
      .catch((err) => {
        console.log('err: ', err)
      })
  },

  methods: {
    create () {
      let _this = this
      if (this.toDo === '') {
        Toast.create.negative('Title is required')
      }
      else {
        Service.create({
          complete: false,
          title: this.toDo
        })
          .then((res) => {
            _this.toDo = ''
            return Service.get()
          })
          .then((res) => {
            _this.toDos = res.data
          })
          .catch(() => {
            Toast.create.negative('Error creating To Do')
          })
      }
    },

    del (t) {
      let _this = this
      Dialog.create({
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete ' + t.title + '?',
        buttons: [
          {
            label: 'Cancel',
            handler () {
            }
          },
          {
            label: 'Yes',
            handler () {
              Service.delete(t.id)
                .then((res) => {
                  return Service.get()
                })
                .then((res) => {
                  _this.toDos = res.data
                  Toast.create.positive('Successfully deleted ' + t.title)
                })
                .catch(() => {
                  Toast.create.negative('Error creating To Do')
                })
            }
          }
        ]
      })
    }
  },

  computed: {
    summary () {
      let len = this.toDos
      this.sum = 0
      _.each(len, (v) => {
        if (v.complete) {
          this.sum++
        }
      })
      len = len.length
      return this.sum > 1 ? this.sum + ' out of ' + len + ' TO DOs' : this.sum + ' out of ' + len + ' TO DO'
    }
  },

  watch: {
    sum () {
      let update = []
      _.each(this.toDos, (v, i) => {
        update.push(Service.update(v))
      })
      Promise.all(update)
        .then((res) => {
          Toast.create.positive('To Do updated')
        })
        .catch(() => {
          Toast.create.negative('Error updating To Do')
        })
    }
  }
}
</script>

<style>
</style>

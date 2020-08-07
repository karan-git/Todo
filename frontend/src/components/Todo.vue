<template>
  <main class="container">
    <div class="alert alert-secondary" role="alert" v-if="isClick">
      {{alertMsg}}
    </div>
    <div class="jumbotron jumbotron-fluid w-80">
      <div class="container">
        <h1 class="display-4 text-center">Todo List</h1>
      </div>
    </div>
    <section class="w-50 m-auto">
      <form @submit.prevent="handleSubmit()">
        <input class="form-control mb-4" type="text" placeholder="Type here and press enter.." v-model="setVar" />
      </form>
      <div v-if="isData">
        <div class="card shadow bg-danger text-white" v-if="getTodo.length == 0">
          <!-- <h5 class="card-header text-center"></h5> -->
          <div class="card-body">
            <h5 class="card-title text-capitalize text-center">No Todo Cards</h5>
            <p class="card-text">Type in above input field and press enter to add a todo card.</p>
          </div>
        </div>
        <div class="card shadow mb-2 bg-light" v-else v-for="(todo, i) in getTodo" :key="i">
          <h5 class="card-header text-center">Task {{i+1}}</h5>
          <div class="card-body d-flex justify-content-between">
            <h5 class="card-title text-capitalize">{{todo}}</h5>
            <!-- <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> -->
            <div>
              <!-- <button class="btn btn-primary">Done</button> -->
              <button class="btn btn-danger" @click="handleDelete(i)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      setVar: "",
      collectTodo: [],
      getTodo: [],
      isData: false,
      isClick: false,
      alertMsg: "",
      showSavedList: []
    }
  },
  mounted() {
    axios.get('http://127.0.0.1:3000/api/todo')
      .then(res => {
        this.isData = true
        this.collectTodo = res.data.todolist
        this.getTodo = this.collectTodo
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
    async handleSubmit() {
      this.collectTodo.push(this.setVar)
      // console.log(this.collectTodo)

      let config = {
        headers : {
          'Content-Type' : 'application/json'
        }
      }

      let todoVar = this.collectTodo
      let responsePost = await axios.post('http://127.0.0.1:3000/api/todo', this.collectTodo, config )
      let res = await responsePost.data
      // this.getTodo = res;
      this.setVar = "";

      let responseGet = await axios.get('http://127.0.0.1:3000/api/todo')
      let resGet = responseGet.data
      this.getTodo = resGet.todolist
    },

    async handleDelete(id) {
      try{
        let responseDelete = await axios.delete(`http://127.0.0.1:3000/api/todo/${id}`)
        let resDel = await responseDelete.data
        // this.getTodo = resDel.todolist
        this.alertMsg = resDel.success;
        this.isClick = true;

        setTimeout(function() {
          window.location.reload();
        }, 1000)
      }
      catch(e){
        console.log(e)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.alert{
  position: fixed;
  bottom: 0;
  left: 15%;
  right: 15%;
  z-index: 2;
  font-weight: 600;
}
</style>

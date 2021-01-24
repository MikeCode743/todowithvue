<template>
  <div>
    <v-row class="my-3">
      <v-chip class="ma-2" color="dark" label>
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
        <h3>TODO LIST</h3>
      </v-chip>
      <v-spacer />
      <v-btn color="primary" dark @click.stop="dialog = true">
        Create
      </v-btn>
    </v-row>
    <v-row>
      <v-col cols="8" offset="2">
        <v-expansion-panels popout>
          <v-expansion-panel v-for="(item, i) in todoList" :key="i">
            <v-expansion-panel-header>
              {{ item.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ item.description }}
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text color="secondary" @click="edit(i)">
                  <v-icon left>
                    mdi-pencil
                  </v-icon>
                  Edit
                </v-btn>
                <v-btn text color="red" @click="deleteItem(item.id)">
                  <v-icon left>mdi-close</v-icon>
                  Delete
                </v-btn>
              </v-card-actions>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <!-- Create MODAL -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">TODO Create</span>
        </v-card-title>
        <v-form @submit.prevent="create">
          <v-card-text>
            <!-- INPUT -->
            <v-text-field
              outlined
              v-model="title"
              label="Title"
              name="title"
              autofocus
              required
            ></v-text-field>
            <v-textarea
              outlined
              v-model="description"
              name="description"
              label="Description"
            ></v-textarea>

            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              type="submit"
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- EDIT MODAL -->
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">TODO EDIT</span>
        </v-card-title>
        <v-form @submit.prevent="editTodo">
          <v-card-text>
            <!-- INPUT -->
            <v-text-field
              outlined
              v-model="title"
              name="title"
              label="Title"
              autofocus
              required
            ></v-text-field>
            <v-textarea
              outlined
              v-model="description"
              name="description"
              label="Description"
            ></v-textarea>

            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- BUTTONS -->
            <v-btn color="blue darken-1" text @click="dialogEdit = false">
              Close
            </v-btn>
            <v-btn
              color="warning"
              text
              type="submit"
              @click="dialogEdit = false"
            >
              Edit
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- SNACKBAR -->
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "TodoComponent",

  data() {
    return {
      todoList: [],
      dialog: false,
      dialogEdit: false,
      title: "",
      description: "",

      indexEdit: 0,

      message: "",
      snackbar: false,
      timeout: 3000,
    };
  },
  methods: {
    create() {
      if (this.validate(this.title, this.description)) {
        this.todoList.push({
          id: Date.now(),
          title: this.title,
          description: this.description,
        });
        this.title = "";
        this.description = "";
        this.showSnackbar("Successfully created");
      }
    },
    deleteItem(id) {
      console.log(id);
      this.todoList = this.todoList.filter((element) => element.id != id);
      this.showSnackbar("Deleted");
    },
    edit(index) {
      this.title = this.todoList[index].title;
      this.description = this.todoList[index].description;
      this.indexEdit = index;
      this.dialogEdit = true;
    },
    editTodo() {
      if (this.validate(this.title, this.description)) {
        this.todoList[this.indexEdit].title = this.title;
        this.todoList[this.indexEdit].description = this.description;
        this.showSnackbar("successfully edited");
      }
    },
    validate(title, description) {
      let validate = true;
      if (title == 0 || description == 0) {
        this.showSnackbar("Title and Description Empty ");
      } else if (title == 0) {
        this.showSnackbar("Title Empty");
        validate = false;
      } else if (description == 0) {
        this.showSnackbar("Description Empty");

        validate = false;
      }
      return validate;
    },
    showSnackbar(message) {
      this.message = message;
      this.snackbar = true;
    },
  },
};
</script>

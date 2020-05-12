<template>
  <div>
    <b-card title="映画監督" class="mt-4">
      <b-form>
        <b-form-group label="監督名" label-for="input-director-name">
          <b-form-input
            v-model="form.director.name"
            type="text"
            id="input-director-name"
            placeholder="監督名"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="年齢" label-for="input-director-age">
          <b-form-input
            v-model="form.director.age"
            type="number"
            id="input-director-age"
            placeholder="年齢"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="outline-info">登録</b-button>
      </b-form>
    </b-card>

    <b-card title="映画作品" class="mt-4">
      <b-form @submit.prevent="addMovie">
        <b-form-group label="タイトル" label-for="input-director-title">
          <b-form-input
            v-model="form.movie.name"
            type="text"
            id="input-director-title"
            placeholder="タイトル"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="ジャンル" label-for="input-director-genre">
          <b-form-input
            v-model="form.movie.genre"
            type="text"
            id="input-director-genre"
            placeholder="ジャンル"
            size="sm"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="監督" label-for="input-director-director">
          <b-form-select v-model="form.movie.directorId" size="sm">
            <b-form-select-option
              v-for="director in directors"
              :value="director.id"
              :key="director.id"
            >{{ director.name }}</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-button type="submit" variant="outline-info">登録</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import { DIRECTOR_LIST, ADD_MOVIE, MOVIE_LIST } from "../../graphql/queries";

export default {
  name: "SideNav",
  apollo: {
    directors: DIRECTOR_LIST
  },
  data() {
    return {
      form: {
        director: {
          name: "",
          age: ""
        },
        movie: {
          name: "",
          genre: "",
          directorId: ""
        }
      }
    };
  },

  methods: {
    addMovie() {
      const { name, genre, directorId } = this.form.movie;
      this.$apollo
        .mutate({
          mutation: ADD_MOVIE,
          variables: {
            name,
            genre,
            directorId
          },
          update: (store, { data: { addMovie } }) => {
            //クエリの実行
            const data = store.readQuery({ query: MOVIE_LIST });
            data.movies.push(addMovie);
            store.writeQuery({ query: MOVIE_LIST, data });
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
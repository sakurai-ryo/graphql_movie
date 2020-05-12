<template>
  <b-table-simple outlined hover class="mt-3">
    <b-thead>
      <b-tr>
        <b-th>タイトル</b-th>
        <b-th>ジャンル</b-th>
        <b-th>監督</b-th>
      </b-tr>
    </b-thead>
    <b-tbody>
      <b-tr v-for="movie in movies" :key="movie.id">
        <b-td>{{ movie.name }}</b-td>
        <b-td>{{ movie.genre }}</b-td>
        <b-td>{{ movie.director.name }}</b-td>
        <b-td>
          <b-button @click="deleteMovie(movie.id)" variant="outline-danger" size="small">削除</b-button>
        </b-td>
      </b-tr>
    </b-tbody>
  </b-table-simple>
</template>

<script>
import { MOVIE_LIST, DELETE_MOVIE } from "../../graphql/queries";

export default {
  name: "MovieList",
  apollo: {
    movies: MOVIE_LIST
  },
  methods: {
    deleteMovie(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_MOVIE,
          variables: {
            id
          },
          update: (store, { data: { deleteMovie } }) => {
            //クエリの実行
            const data = store.readQuery({ query: MOVIE_LIST });
            data.movies = data.movies.filter(movie => {
              movie.id !== deleteMovie.id;
            });
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
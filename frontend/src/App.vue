<template>
  <div id="app">
    <Header></Header>
    <b-container>
      <b-row>
        <b-col md="4">
          <SideNav></SideNav>
        </b-col>
        <b-col md="8">
          <MovieList></MovieList>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import SideNav from "./components/SideNav";
import MovieList from "./components/MovieList";

export default {
  name: "App",
  components: { Header, SideNav, MovieList }
};
</script>

<style>
</style>

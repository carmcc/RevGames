<template>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
<!--      <a class="navbar-brand" href="#">RevGames</a>-->
        <a class="navbar-brand" href="#">
            <img src="/favicon.ico" alt="RevGames logo" width="40" height="40" style="border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.5); background-color: black;">
            RevGames
        </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page"><router-link to="/">Home</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link to="/signup" v-if="!isLogged">SignUp</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link to="/signin" v-if="!isLogged">SignIn</router-link></a>
            </li>
            <li class="nav-item">
              <a class="nav-link"><router-link to="/logout" v-if="isLogged">Logout</router-link></a>
            </li>
<!--            <li class="nav-item">-->
<!--              <router-link to="/profile">Profile</router-link>-->
<!--            </li>-->
<!--            <li class="nav-item dropdown">-->
<!--              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--                Dropdown-->
<!--              </a>-->
<!--              <ul class="dropdown-menu dropdown-menu-dark">-->
<!--                <li><a class="dropdown-item" href="#">Action</a></li>-->
<!--                <li><a class="dropdown-item" href="#">Another action</a></li>-->
<!--                <li>-->
<!--                  <hr class="dropdown-divider">-->
<!--                </li>-->
<!--                <li><a class="dropdown-item" href="#">Something else here</a></li>-->
<!--              </ul>-->
<!--            </li>-->
          </ul>
<!--          <form class="d-flex mt-3" role="search">-->
<!--            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">-->
<!--            <button class="btn btn-success" type="submit">Search</button>-->
<!--          </form>-->
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavSideBar",
  computed: {
    isLogged() {
      return this.$store.state.isLogged
    }
  }

}
</script>

<style scoped>
a {
  color: #f1f1f5; /* Cambia il colore dei link */
  text-decoration: none; /* Rimuove il sottolineato */
}

a:hover {
  color: #cbc8c8; /* Cambia il colore dei link al passaggio del mouse */
  text-decoration: none; /* Rimuove il sottolineato */}
</style>
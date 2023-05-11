<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="not-found-title">Oops! Page Not Found</h1>
      <div class="not-found-image">
        <img src="../assets/lolcat_404.jpg" alt="404 Error Image" />
      </div>
      <p class="not-found-description">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <router-link to="/" class="not-found-link">
        <i class="fas fa-arrow-left"></i> Go back to home page
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ErrorPage"
}
</script>

<style>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-found-content {
  text-align: center;
}

.not-found-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #f44336;
}

.not-found-image img {
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-width: 100%;
  height: auto;
}

.not-found-description {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-top: 2rem;
  margin-bottom: 3rem;
  color: #666;
}

.not-found-link {
  font-size: 1.2rem;
  text-decoration: none;
  color: #fff;
  background-color: #0d6efd;
  border-radius: 20px;
  padding: 1rem 2rem;
  transition: all 0.3s ease;
}

.not-found-link:hover {
  transform: scale(1.1);
}
</style>
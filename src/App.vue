<template>
  <div>
    <top-header />
    <b-container fluid>
      <transition name="router">
        <router-view />
      </transition>
    </b-container>
  </div>
</template>

<script>
import TopHeader from "@/components/Header/TopHeader";

export default {
  name: "App",
  components: {
    TopHeader
  }
};
</script>

<style>
.box-shadow {
  box-shadow: 3px 2px 4px 2px #b3b3b3;
}

.total {
  font-weight: 500;
  font-size: 1.5rem;
}

.body-height {
  max-height: 88vh;
}

.container-fluid {
  margin-top: 2rem;
}

.router-enter-to,
.router-leave {
  opacity: 1;
  transition: 0.5s ease;
  transform: translateX(0);
  transition-delay: 0.5s;
}

.router-enter {
  transform: translateX(300px);
  opacity: 0;
}

.router-leave-active {
  transform: translateX(-300px);
  opacity: 0;
  transition: 0.5s ease;
}
</style>

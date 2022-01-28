<template>
  <header id="nav">
    <div class="logo"></div>
    <div class="menu-icons">
      <div class="notification-icon"></div>
      <div class="help-icon"></div>
      <div class="profile-image"></div>
    </div>
  </header>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TopNav",
});
</script>

<style lang="sass">
@import "../assets/sass/_variables.sass"

#nav
    display: flex
    justify-content: space-between
    border-bottom: 2px solid #DFE1E6B5

    & > div.logo
        flex-basis: 5%
        margin: 0 1%
        background: no-repeat center/contain $logo

    & > div.menu-icons
        flex-basis: 10%
        display: flex
        justify-content: space-evenly
        align-items: center

        & > div
            width: 25px
            height: 25px
            margin: 0 2%

        &  div.notification-icon
            background: no-repeat center/80% $notification_icon
        &  div.help-icon
            background: no-repeat center/80% $help_icon
        &  div.profile-image
            width: 35px
            height: 35px
            background: no-repeat center/contain url("../assets/Rectangle.jpg")
</style>
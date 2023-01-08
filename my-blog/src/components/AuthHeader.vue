<template>
  <div class="header">
    <a style="color: #f3f3f3" href="/login"><h3>Blog Application.</h3></a>
    <div class="userAuth">
      <h3>Hello {{ this.userName }} ! &nbsp;</h3>
      <img src="../../public/asset/user-icon.png" alt="alternatetext" />
      <button @click="signout">&nbsp; Sign Out</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userName: "",
    };
  },
  methods: {
    signout() {
      localStorage.removeItem("user-info");
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      console.log("User", JSON.parse(user));
      console.log("userNAme", JSON.parse(user).userName);
      this.userName = JSON.parse(user).userName;
    }
  },
};
</script>
<style>
.header {
  background-color: #265984;
  height: 60px;
}
.userAuth {
  display: flex;
  float: right;
  margin: -7px 100px 0px 0px;
  color: lightblue;
}
.userAuth img {
  height: 30px;
}
.userAuth button {
  margin-top: -4px;
  color: red;
}
</style>

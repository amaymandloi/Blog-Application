<template>
  <div>
    <Header />
    <div class="dashboard">
      <Sidebar />

      <div class="content">
        <div class="dash-head">Welcome to Blog Application</div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/UnAuthSideBar";
import Header from "../components/Header.vue";
export default {
  name: "Login",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      email: "",
      password: "",
      errorEmail: "",
      errorPassword: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      console.log("User", user);
      this.$router.push({ name: "Dashboard" });
    }
  },
  created() {},
  methods: {
    fromValidation() {
      // const userDetail = JSON.parse(localStorage.getItem(this.email));
      // console.log("UserDetail===>", userDetail);
      console.log("username=>", this.email, "Password=>", this.password);
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        this.errorEmail = "invalid email (use @ and .com)";
        return;
      } else {
        this.errorEmail = "";
      }
      // if (
      //   !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(
      //     this.password
      //   )
      // ) {
      //   this.errorPassword =
      //     "*** use 8-20 word one is Uppercase and LowerCase also Special Symbol  Password";
      //   return;
      // } else {
      //   this.errorPassword = "";
      // }
      this.loginUser();
    },
    loginUser() {
      const myHeaders = new Headers({});
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000");
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      myHeaders.append("x-access-token", localStorage.getItem("token"));

      fetch(`http://localhost:8000/api/v1/login`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status) {
            console.log(res.data);
            console.log("User Logged");
            localStorage.setItem("user-info", JSON.stringify(res.data));
            this.$router.push({ name: "Dashboard" });
          } else {
            this.errorPassword = res.message;
          }
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style>
.dash-head {
  font-size: 30px;
  font-weight: 500;
  margin: 43px 0px 0px 54px;
  color: #265984;
}
.right-content {
  color: white;
  background-color: #5aa8e8;
  display: inline;
  float: left;
  margin-top: 25px;
  margin-right: 20px;
  margin-left: 200px;
  margin-bottom: 50px;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
  height: 300px;
  width: 500px;
}
.content {
  background-color: white;
  border-radius: 10px;
}
.dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #265984;
  height: 100vh;
  width: 100vw;
}

.right-content form a {
  font-size: small;
  float: right;
  margin-right: 30px;
  color: white;
}
.right-content form input {
  width: 90px;
  height: 42px;
  background-color: white;
  border-radius: 5px;
  max-height: 66px !important;
}
.right-content form h1 {
  font-size: xx-large;
  font-weight: 600;
}
.right-content form .checkbx {
  float: left;
  font-size: small;
}
.right-content form {
  padding-left: 25px;
  padding-right: 25px;
  text-align: left;
}
.right-content form .btn1 {
  position: absolute;
  background-color: rgb(27, 192, 33);
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  box-shadow: #2d3540;
  cursor: pointer;
  border-radius: 0px;
  align-items: center;
}
.right-content form .btn:hover {
  background-color: black;
}
.right-content form .checkbx {
  width: 10px;
}
.right-content .banner {
  background-color: white;
  width: 100%;
  height: 60px;
}
</style>

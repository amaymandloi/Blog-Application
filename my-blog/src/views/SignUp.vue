<template class="bg">
  <div>
    <Header />
    <div class="dashboard">
      <Sidebar />

      <div class="content">
        <div class="dash-head">Register</div>
        <div class="right-content">
          <v-form id="form" @submit.prevent="formValidation">
            <div class="form-control">
              <label for="Welcome" class="heading">Welcome</label>
              <v-text-field
                type="text"
                id="username"
                placeholder="Username"
                v-model="username"
              />
              <span v-if="errorUsername" class="error">{{
                errorUsername
              }}</span>
            </div>
            <div class="form-control">
              <v-text-field
                v-model="email"
                placeholder="Email"
                type="text"
                id="email"
              />
              <span v-if="errorEmail" class="error">{{ errorEmail }}</span>
            </div>
            <div class="form-control">
              <v-text-field
                v-model="password"
                type="password"
                placeholder="Password"
                id="password"
              />
              <span v-if="errorPassword" class="error">{{
                errorPassword
              }}</span>
            </div>
            <div class="form-control">
              <v-text-field
                v-model="confpassword"
                type="password"
                id="confpassword"
                placeholder="Confirm Password"
              />
              <span v-if="errorConfPassword" class="error">{{
                errorConfPassword
              }}</span>
            </div>
            <!-- <v-btn type="submit">Signup</v-btn> -->
            <v-btn color="secondary" small type="submit">SignUp</v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../components/UnAuthSideBar";
import Header from "../components/Header.vue";
export default {
  name: "SignUp",
  components: {
    Header,
    Sidebar,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confpassword: "",
      errorUsername: "",
      errorEmail: "",
      errorPassword: "",
      errorConfPassword: "",
    };
  },
  methods: {
    formValidation() {
      //username
      if (!this.username) {
        this.errorUsername = "UserName is required";
        return;
      } else {
        this.errorUsername = "";
      }
      //email
      if (!this.email) {
        this.errorEmail = "Email is required";
        return;
      } else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
      ) {
        this.errorEmail = "use @ and .com";
        return;
      } else {
        this.errorEmail = "";
      }
      //password
      if (!this.password) {
        this.errorPassword = "Password is required";
        return;
      } else if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/.test(
          this.password
        )
      ) {
        this.errorPassword =
          "*** use 8-20 word one is Uppercase and LowerCase also Special Symbol  Password";
        return;
      } else {
        this.errorPassword = "";
      }
      // Confirm_password
      if (!this.confpassword) {
        this.errorConfPassword = "required";
        return;
      } else if (this.confpassword != this.password) {
        this.errorConfPassword = "*** Confirm and password not match";
        return;
      } else {
        this.errorConfPassword = "";
      }
      if (this.username && this.email && this.password && this.confpassword) {
        this.registerUser();
      }
    },
    registerUser() {
      const myHeaders = new Headers({});
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000");
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      myHeaders.append(
        "x-access-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1cmlAbWFpbC5jb20iLCJpYXQiOjE2NzE3ODE3MTB9.9QzrE6ap8QMPOeOpjDggEQk519LbT9Vt7YGyPrgPAWM"
      );

      fetch(`http://localhost:8000/api/v1/user`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          userName: this.username,
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.status) {
            console.log(res.data);
            console.log("User Registered");
            this.$router.push({ name: "login" });
          } else {
            this.errorConfPassword = res.error;
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
  height: 460px;
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

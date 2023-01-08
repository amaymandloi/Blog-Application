<template>
  <div>
    <Header />
    <div class="dashboard">
      <Sidebar />
      <div class="content">
        <div class="dash-head">Create Blog</div>
        <div class="blog-form">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="20"
              :rules="nameRules"
              label="Blog Name"
              required
            ></v-text-field>

            <v-text-field
              v-model="heading"
              :counter="70"
              :rules="headingRules"
              label="Blog Heading"
              required
            ></v-text-field>

            <v-text-field
              v-model="description"
              :rules="descriptionRules"
              label="Blog Description"
              required
            ></v-text-field>

            <v-btn color="success" class="mr-4" @click="createPost">
              Create
            </v-btn>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/AuthHeader.vue";
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "home",
  components: {
    Sidebar,
    Header,
  },

  data() {
    return {
      name: "",
      heading: "",
      description: "",
      valid: true,
      name: "",
      nameRules: [
        (v) => !!v || "Blog Name is required",
        (v) => (v && v.length <= 20) || "Name must be less than 10 characters",
      ],
      headingRules: [
        (v) => !!v || "Blog Heading is required",
        (v) => (v && v.length <= 70) || "Name must be less than 10 characters",
      ],
      descriptionRules: [(v) => !!v || "Blog Description is required"],
    };
  },
  created() {
    if (!localStorage.getItem("token")) {
      alert("You are not authorized ! PLEASE LOG IN ");
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    createPost() {
      const myHeaders = new Headers({});
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000");
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      myHeaders.append("x-access-token", localStorage.getItem("token"));

      fetch(`http://localhost:8000/api/v1/blog`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          blogName: this.name,
          blogHeading: this.heading,
          blogDescription: this.description,
          userId: JSON.parse(localStorage.getItem("user-info")).userId,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);

          alert("Blog is Created");
          this.name = "";
          this.heading = "";
          this.$router.push({ name: "myBlog" });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.blog-form {
  width: 42%;
  margin: 100px 0px 0px 0px;
}
.comment-form {
  margin-left: 81px;
  width: 100%;
  margin-right: -11px;
}
.blog-comment {
  display: flex;
}
.blog-comment p {
  font-size: 16px;
  margin-top: 4px;
  margin-left: 58px;
}
.blog-comment h2 {
  font-size: 21px;
  margin-top: 4px;
  margin-left: 58px;
}
.v-application .mx-auto {
  margin-right: auto !important;
  margin-left: 80px !important;
  margin-top: 20px !important;
}
.blog-heading {
  font-size: 20px;
  font-weight: 500;
  margin: 47px 0px 27px 70px;
}
.blog-description {
  font-size: 18px;
  font-weight: 400;
  margin: 24px 0px 20px 78px;
}
.dash-head {
  font-size: 30px;
  font-weight: 500;
  margin: 43px 0px 0px 54px;
  color: #265984;
}
.v-sheet.v-card {
  border-radius: 35px !important;
  border: groove;
}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #265984;
  height: 100vh;
  width: 100vw;
}
.content {
  display: flex;
  background-color: white;
  border-radius: 10px;
}
</style>

<template>
  <div>
    <Header />
    <div class="dashboard">
      <Sidebar />
      <div class="content">
        <div>
          <div class="dash-head">{{ blog.blogName }}</div>
          <div class="blog-heading">{{ blog.blogHeading }}</div>
          <!-- <div class="blog-heading">{{ blog.blogDescription }}</div> -->
          <div class="blog-description">
            {{ blog.blogDescription }}
          </div>
          <div class="dash-head add-comments">Comment</div>
          <div class="comment-form">
            <v-text-field
              v-model="myComment"
              :counter="50"
              :rules="nameRules"
              label="Comment"
              required
            ></v-text-field>

            <v-btn color="success" class="mr-4" @click="addComment">
              Comment
            </v-btn>
          </div>
          <div class="blog-heading"></div>
        </div>
        <div>
          <p class="blog-heading">
            Blog Created By&#160; {{ blog.user.userName }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/AuthHeader.vue";
import Sidebar from "../components/BlogSideBar.vue";
export default {
  name: "home",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      myComment: "",
      valid: true,
      blog: {},
      blogId: this.$route.params.id,
    };
  },
  methods: {
    addComment() {
      const myHeaders = new Headers({});
      console.log("Comment", this.myComment);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000");
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      myHeaders.append("x-access-token", localStorage.getItem("token"));

      fetch(`http://localhost:8000/api/v1/comment`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          comment: this.myComment,
          blogId: this.blog.blogId,
          userId: JSON.parse(localStorage.getItem("user-info")).userId,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);

          this.myComment = "";
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getBlog() {
      const myHeaders = new Headers({});
      myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000");
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      myHeaders.append("x-access-token", localStorage.getItem("token"));

      fetch(`http://localhost:8000/api/v1/blog/${this.blogId}`, {
        method: "GET",
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((blog) => {
          console.log(blog);
          this.blog = blog.data;
          this.myComment = "";
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  created() {
    if (!localStorage.getItem("token")) {
      alert("You are not authorized ! PLEASE LOG IN ");
      this.$router.push({ name: "login" });
    }
    this.getBlog();
  },
};
</script>

<style>
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

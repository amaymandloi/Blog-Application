<template>
  <div>
    <Header />
    <div class="dashboard">
      <Sidebar />
      <div class="content">
        <!-- <router-view /> -->
        <div class="dash-head">My Blogs</div>
        <div v-for="value in myObject">
          <v-card class="mx-auto" max-width="640" outlined>
            <v-list-item three-line>
              <!-- <router-link to="'/job/'r.id">{{ value.blogName }}</router-link> -->

              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  {{ value.blogName }}
                </v-list-item-title>

                <v-icon>fas fa-edit</v-icon>
                <a :href="'/myBlogs/' + value.blogId" class="text-overline mb-4"
                  >Go to Blog</a
                >
              </v-list-item-content>
            </v-list-item>

            <!-- </v-card-actions> -->
          </v-card>
        </div>
        <v-pagination
          v-model="page"
          :length="15"
          :total-visible="7"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/AuthHeader.vue";
import Sidebar from "../components/Sidebar";
export default {
  name: "home",
  components: {
    Sidebar,
    Header,
  },
  data() {
    return {
      userId: JSON.parse(localStorage.getItem("user-info")).userId,
      myObject: [],
    };
  },
  methods: {
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    getMyBlog() {
      console.log(
        "userId",
        JSON.parse(localStorage.getItem("user-info")).userId
      );
      const myHeaders = new Headers({});
      myHeaders.append("Access-Control-Allow-Origin", "http://localhost:8000");
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      myHeaders.append("x-access-token", localStorage.getItem("token"));

      fetch(`http://localhost:8000/api/v1/user/${this.userId}`, {
        method: "GET",
        // mode: "no-cors",
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((blog) => {
          console.log(blog);
          this.myObject = blog.data.blogs;
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
    this.getMyBlog();
  },
};
</script>

<style>
.v-card__actions > .v-btn.v-btn {
  font-size: 12px;
  border: groove;
}
.v-application .mx-auto {
  margin-right: auto !important;
  margin-left: 80px !important;
  margin-top: 20px !important;
}
.blog-heading {
  font-size: 20px;
  font-weight: 500;
  margin: 51px 0px 39px 80px;
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
.v-list--three-line .v-list-item .v-list-item__subtitle,
.v-list-item--three-line .v-list-item__subtitle {
  -webkit-line-clamp: 100 !important;
}

.dashboard {
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: #265984;
  height: 100vh;
  width: 100vw;
}
.content {
  background-color: white;
  border-radius: 10px;
}
</style>

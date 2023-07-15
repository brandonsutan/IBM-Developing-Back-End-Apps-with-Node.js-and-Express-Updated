// app.js
new Vue({
    el: '#app',
    data() {
      return {
        loggedIn: false,
        username: '',
        loginForm: {
          username: '',
          password: ''
        },
        books: []
      };
    },
    methods: {
      login() {
        // Implement the login logic here using API requests or mock data
        // Set the loggedIn state and username
        this.loggedIn = true;
        this.username = this.loginForm.username;
      },
      logout() {
        // Implement the logout logic here
        // Reset the loggedIn state and username
        this.loggedIn = false;
        this.username = '';
      },
      fetchBooks() {
        // Implement fetching books from the backend here using API requests or mock data
        // Update the books array with the retrieved data
        this.books = [
          { id: 1, title: 'Book 1', author: 'Author 1' },
          { id: 2, title: 'Book 2', author: 'Author 2' },
          { id: 3, title: 'Book 3', author: 'Author 3' }
        ];
      }
    },
    mounted() {
      // Fetch books when the component is mounted
      this.fetchBooks();
    }
  });
  
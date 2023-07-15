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
      // Import the books object from booksdb.js using dynamic import
      import('./router/booksdb.js').then(module => {
        // Extract the books object from the imported module
        const books = module.default;
        // Convert the books object to an array
        this.books = Object.values(books);
      }).catch(error => {
        console.error('Failed to fetch books:', error);
      });
    }    
  },
  mounted() {
    // Fetch books when the component is mounted
    this.fetchBooks();
  }
});

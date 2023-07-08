async function saveToCloudStoarage(event) {
  try {
    event.preventDefault();

    const loginDetails = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    console.log('loginDetails', loginDetails);

    const response = await axios.post('http://localhost:700/login', loginDetails)
    event.target.reset();
    alert(response.data.message)

  } catch (error) {
    const errorMessage = error.message || 'An error occured';
    const errorHtml = `
          <div class="col-lg-6 col-lg-offset-4">
            <p class="text-danger">${errorMessage}</p>
          </div>
        `;
    document.body.innerHTML += errorHtml;
  }

}
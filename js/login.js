const loginForm = document.getElementById("login-form");

const username = document.getElementById("login-username");
const password = document.getElementById("login-password");
const formMessage = document.getElementById("login-form-message");

let users = [];

// đăng nhập
loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let isValid = true;

  // kiểm tra tên đăng nhập
  if (username.value.trim() === "") {
    setError(username, "Tên đăng nhập không được để trống");
    isValid = false;
  } else {
    setSuccess(username);
  }

  // kiểm tra mật khẩu
  if (password.value.trim() === "") {
    setError(password, "Mật khẩu không được để trống");
    isValid = false;
  } else {
    setSuccess(password);
  }

  if (isValid) {
    const user = users.find(user =>
      user.username === username.value.trim() &&
      user.password === password.value.trim()
    );
    if (user) {
      formMessage.innerText = "Đăng nhập thành công!";
      loginForm.reset();
    } else {
      formMessage.innerText = "Tên đăng nhập hoặc mật khẩu không đúng.";
    }
  }
});

// hiển thị thông báo lỗi
function setError(input, message) {
  input.classList.add("form-control-error");
  const error = input.nextElementSibling;
  error.innerText = message;
}

// hiển thị thông báo thành công
function setSuccess(input) {
  input.classList.remove("form-control-error");
  const error = input.nextElementSibling;
  error.innerText = "";
}

// lấy danh sách người dùng từ localStorage
function getUsers() {
  const usersFromStorage = localStorage.getItem("users");
  if (usersFromStorage) {
    users = JSON.parse(usersFromStorage);
  }
}

getUsers();
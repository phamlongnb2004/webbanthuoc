const registerForm = document.getElementById("register-form");

const username = document.getElementById("register-username");
const password = document.getElementById("register-password");
const confirmPassword = document.getElementById("register-confirm-password");
const email = document.getElementById("register-email");
const formMessage = document.getElementById("register-form-message");

let users = [];

// đăng ký tài khoản
registerForm.addEventListener("submit", function(event) {
  event.preventDefault();

  let isValid = true;

  // kiểm tra tên đăng nhập
  if (username.value.trim() === "") {
    setError(username, "Tên đăng nhập không được để trống");
    isValid = false;
  } else if (isUsernameExists(username.value)) {
    setError(username, "Tên đăng nhập đã tồn tại, vui lòng chọn tên khác.");
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

  // kiểm tra xác nhận mật khẩu
  if (confirmPassword.value.trim() === "") {
    setError(confirmPassword, "Vui lòng xác nhận mật khẩu.");
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    setError(confirmPassword, "Mật khẩu không khớp.");
    isValid = false;
  } else {
    setSuccess(confirmPassword);
  }

  // kiểm tra email
  if (email.value.trim() === "") {
    setError(email, "Email không được để trống.");
    isValid = false;
  } else if (!isEmailValid(email.value)) {
    setError(email, "Email không hợp lệ.");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (isValid) {
    const newUser = {
      username: username.value.trim(),
      password: password.value.trim(),
      email: email.value.trim(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    formMessage.innerText = "Đăng ký tài khoản thành công!";
    registerForm.reset();
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

// kiểm tra tên đăng nhập tồn tại
function isUsernameExists(username) {
  return users.find(user => user.username === username.trim()) !== undefined;
}

// kiểm tra email hợp lệ
function isEmailValid(email) {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email.trim());
}

// lấy danh sách người dùng từ localStorage
function getUsers() {
  const usersFromStorage = localStorage.getItem("users");
  if (usersFromStorage) {
    users = JSON.parse(usersFromStorage);
  }
}

getUsers();
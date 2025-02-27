document.addEventListener('DOMContentLoaded', function() {

   const telefoneElem = document.getElementById('Telefone');
   if (telefoneElem) {
     const phoneMask = IMask(telefoneElem, {
       mask: '(00) 00000-0000'
     });
   }

   // Evento para cadastroForm
   const cadastroForm = document.getElementById("cadastroForm");
   if (cadastroForm) {
     cadastroForm.addEventListener("submit", function(event) {
       event.preventDefault(); // Impede o envio padrão do formulário
       document.getElementById("successMessage").style.display = "block";
       setTimeout(function() {
         window.location.href = "index.html";
       }, 1500);
     });
   }

   // Evento para loginForm
   const loginForm = document.getElementById("loginForm");
   if (loginForm) {
     loginForm.addEventListener("submit", function(event) {
       event.preventDefault(); // Impede o envio tradicional do formulário
       var email = document.getElementById("email").value.trim();
       var password = document.getElementById("password").value.trim();
       var messageDiv = document.getElementById("message");

       if (email === "" || password === "") {
         messageDiv.className = "alert alert-danger mt-3";
         messageDiv.textContent = "Por favor, preencha todos os campos.";
         messageDiv.style.display = "block";
         return;
       }

       messageDiv.className = "alert alert-success mt-3";
       messageDiv.textContent = "Login realizado com sucesso! Você será redirecionado...";
       messageDiv.style.display = "block";

       setTimeout(function() {
         window.location.href = "index.html";
       }, 1500);
     });
   }
});

document.addEventListener('DOMContentLoaded', function() {

   const periodicidadeRadios = document.querySelectorAll('input[name="btnradio"]');
   const valorRadios = document.querySelectorAll('input[name="btnradio-valor"]');
   const valorLabels = document.querySelectorAll('[role="groupPrice"] label');
   const valorPersonalizado = document.getElementById('valorPersonalizado');
   const btnDoar = document.getElementById('btnDoar');
   const valorError = document.getElementById('valorError');
   const doacaoModal = new bootstrap.Modal(document.getElementById('doacaoModal'));
   const modalMessage = document.getElementById('modalMessage');

   const valores = {
       mensal: [39, 55, 100],
       unica: [100, 180, 250]
   };

   function atualizarValoresFixos(periodicidade) {
       const novosValores = valores[periodicidade];
       
       valorLabels.forEach((label, index) => {
           label.textContent = `R$ ${novosValores[index]}`;
           label.previousElementSibling.value = novosValores[index];
       });

       const radioSelecionado = document.querySelector('input[name="btnradio-valor"]:checked');
       if(radioSelecionado) {
           valorPersonalizado.value = radioSelecionado.value;
       }
   }

   periodicidadeRadios.forEach(radio => {
       radio.addEventListener('change', (e) => {
           const tipo = e.target.id === 'btnradio2' ? 'unica' : 'mensal';
           atualizarValoresFixos(tipo);
       });
   });

   valorRadios.forEach(radio => {
       radio.addEventListener('change', (e) => {
           valorPersonalizado.value = e.target.value;
       });
   });

   valorPersonalizado.addEventListener('input', function() {
       valorRadios.forEach(radio => radio.checked = false);
   });

   atualizarValoresFixos('mensal'); // Define valores iniciais

   function getValorDoacao() {
      const radioSelecionado = document.querySelector('input[name="btnradio-valor"]:checked');
      return radioSelecionado ? 
          parseFloat(radioSelecionado.value) : 
          parseFloat(valorPersonalizado.value);
  }

  btnDoar.addEventListener('click', function() {
      valorError.classList.add('d-none');
      
      const valor = getValorDoacao();
      
      if (isNaN(valor) || valor <= 0) {
          valorError.textContent = "Por favor, insira um valor maior que zero!";
          valorError.classList.remove('d-none');
          return;
      }

      const periodicidade = document.querySelector('input[name="btnradio"]:checked').id === 'btnradio2' ? 'única' : 'mensal';
      modalMessage.textContent = `Obrigado por sua doação ${periodicidade} de R$ ${valor.toFixed(2)}!`;
      
      // Mostrar modal
      doacaoModal.show();
  });
});
document.addEventListener('DOMContentLoaded', function() {
   // Elementos principais
   const periodicidadeRadios = document.querySelectorAll('input[name="btnradio"]');
   const valorRadios = document.querySelectorAll('input[name="btnradio-valor"]');
   const valorLabels = document.querySelectorAll('[role="groupPrice"] label');
   const valorPersonalizado = document.getElementById('valorPersonalizado');

   // Valores para cada periodicidade
   const valores = {
       mensal: [39, 55, 100],
       unica: [100, 180, 250]
   };

   // Função para atualizar valores e labels
   function atualizarValoresFixos(periodicidade) {
       const novosValores = valores[periodicidade];
       
       // Atualiza labels e valores dos radios
       valorLabels.forEach((label, index) => {
           label.textContent = `R$ ${novosValores[index]}`;
           label.previousElementSibling.value = novosValores[index]; // Atualiza o valor do input radio
       });

       // Atualiza o valor personalizado se houver radio selecionado
       const radioSelecionado = document.querySelector('input[name="btnradio-valor"]:checked');
       if(radioSelecionado) {
           valorPersonalizado.value = radioSelecionado.value;
       }
   }

   // Evento para mudança de periodicidade
   periodicidadeRadios.forEach(radio => {
       radio.addEventListener('change', (e) => {
           const tipo = e.target.id === 'btnradio2' ? 'unica' : 'mensal';
           atualizarValoresFixos(tipo);
       });
   });

   // Evento para valores fixos (mantém sua função anterior)
   valorRadios.forEach(radio => {
       radio.addEventListener('change', (e) => {
           valorPersonalizado.value = e.target.value;
       });
   });

   // Evento para valor personalizado (mantém sua função anterior)
   valorPersonalizado.addEventListener('input', function() {
       valorRadios.forEach(radio => radio.checked = false);
   });

   // Inicialização
   atualizarValoresFixos('mensal'); // Define valores iniciais
});
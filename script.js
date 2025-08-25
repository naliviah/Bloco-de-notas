const rascunho = document.querySelector('#rascunho');
const notasSalvas = document.querySelector('#notas-salvas');
const btnLimparRascunho = document.querySelector('#limpar-rascunho');
const btnLimparNotas = document.querySelector('#limpar-notas');
const btnExportarNotas = document.querySelector('#exportar-notas');
const notasCounter = document.querySelector('#notas-counter');
const rascunhoCounter = document.querySelector('#rascunho-counter');

rascunho.value = sessionStorage.getItem('rascunho') || '';
notasSalvas.value = localStorage.getItem('notas') || '';

notasSalvas.addEventListener('input', () => {
  localStorage.setItem('notas', notasSalvas.value);
  notasCounter.textContent = `${notasSalvas.value.length} caracteres`;
});


rascunho.addEventListener('input', () => {
  sessionStorage.setItem('rascunho', rascunho.value);
  rascunhoCounter.textContent = `${rascunho.value.length} caracteres`;
});


btnLimparRascunho.addEventListener('click', () => {
  rascunho.value = '';
  sessionStorage.removeItem('rascunho');
  rascunhoCounter.textContent = '0 caracteres'; 
});


btnLimparNotas.addEventListener('click', () => {
  const confirmar = confirm("Tem certeza que deseja apagar todas as notas salvas?");
  if (confirmar) {
    notasSalvas.value = '';
    localStorage.removeItem('notas');
    notasCounter.textContent = '0 caracteres'; 
  }
});

btnExportarNotas.addEventListener('click', () => {
  const texto = notasSalvas.value.trim();
  const blob = new Blob([texto], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'minhas-notas.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

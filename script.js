const produtosPadrao = [{"categoria": "Flexível 1X", "produto": "1,5 mm²", "unidade": "m", "pesoReferencia": 1.97, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Flexível 1X", "produto": "2,5 mm²", "unidade": "m", "pesoReferencia": 2.98, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Flexível 1X", "produto": "4,0 mm²", "unidade": "m", "pesoReferencia": 4.45, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Flexível 1X", "produto": "6,0 mm²", "unidade": "m", "pesoReferencia": 6.2, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Flexível 1X", "produto": "10,0 mm²", "unidade": "m", "pesoReferencia": 10.6, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Paralelo 2X", "produto": "1,0 mm²", "unidade": "m", "pesoReferencia": 3.483, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Paralelo 2X", "produto": "1,5 mm²", "unidade": "m", "pesoReferencia": 4.1, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Paralelo 2X", "produto": "2,5 mm²", "unidade": "m", "pesoReferencia": 6.4, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Cabo PP 2X", "produto": "1,0 mm²", "unidade": "m", "pesoReferencia": 6.211, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Cabo PP 2X", "produto": "1,5 mm²", "unidade": "m", "pesoReferencia": 8.2, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Cabo PP 2X", "produto": "2,5 mm²", "unidade": "m", "pesoReferencia": 5.875, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Cabo PP 3X", "produto": "1,0 mm²", "unidade": "m", "pesoReferencia": null, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "incompleto"}, {"categoria": "Cabo PP 3X", "produto": "1,5 mm²", "unidade": "m", "pesoReferencia": 10.4, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Cabo PP 3X", "produto": "2,5 mm²", "unidade": "m", "pesoReferencia": 1.58, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Cabo PP 3X", "produto": "4,0 mm²", "unidade": "m", "pesoReferencia": 16.37, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "7 Pernas Rígido", "produto": "10 mm²", "unidade": "m", "pesoReferencia": 10.6, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "7 Pernas Rígido", "produto": "16 mm²", "unidade": "m", "pesoReferencia": null, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "incompleto"}, {"categoria": "7 Pernas Rígido", "produto": "25 mm²", "unidade": "m", "pesoReferencia": null, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "incompleto"}, {"categoria": "FLEX 16,00 750 V", "produto": "16 mm²", "unidade": "m", "pesoReferencia": 15.85, "comprimentoReferencia": 100, "referenciaUnidade": "m", "status": "ok"}, {"categoria": "Arruela", "produto": "Referência 45383", "unidade": "unidades", "pesoReferencia": 53.0, "comprimentoReferencia": 20, "referenciaUnidade": "unidades", "status": "ok"}, {"categoria": "Parafuso", "produto": "4,0 x 35", "unidade": "unidades", "pesoReferencia": 0.185, "comprimentoReferencia": 100, "referenciaUnidade": "unidades", "status": "ok"}];

let produtos = produtosPadrao.slice();
const categoria = document.getElementById("categoria");
const produto = document.getElementById("produto");
const peso = document.getElementById("peso");
const calcular = document.getElementById("calcular");
const limpar = document.getElementById("limpar");
const resultado = document.getElementById("resultado");
const valor = document.getElementById("valor");
const detalhe = document.getElementById("detalhe");
const erro = document.getElementById("erro");
const refBody = document.getElementById("refBody");

function categorias(){
  return [...new Set(produtos.map(x=>x.categoria))];
}
function carregarCategorias(){
  categoria.innerHTML='<option value="">Selecione o tipo</option>';
  categorias().forEach(c=>{
    const o=document.createElement("option");o.value=c;o.textContent=c;categoria.appendChild(o);
  });
}
function carregarProdutos(){
  produto.innerHTML='<option value="">Selecione a bitola / produto</option>';
  const cat=categoria.value;
  produtos.forEach((p,i)=>{
    if(p.categoria===cat){
      const o=document.createElement("option");
      o.value=i;
      o.textContent=p.status==="ok"?p.produto:p.produto+" — dados incompletos";
      produto.appendChild(o);
    }
  });
}
function fmt(n,d=2){return n.toLocaleString("pt-BR",{minimumFractionDigits:d,maximumFractionDigits:d})}
function showError(msg){erro.textContent=msg;erro.classList.remove("hidden");resultado.classList.add("hidden")}
function clearError(){erro.classList.add("hidden")}
function calcularResultado(){
  clearError();
  const idx=Number(produto.value);
  if(categoria.value===""){showError("Selecione o tipo de produto.");return}
  if(produto.value===""){showError("Selecione a bitola ou produto.");return}
  const p=produtos[idx];
  const pesoInformado=Number(String(peso.value).replace(",","."));
  if(!peso.value || !Number.isFinite(pesoInformado) || pesoInformado<=0){showError("Informe um peso maior que zero.");return}
  if(p.status!=="ok" || p.pesoReferencia===null){showError("Este item aparece na planilha, mas não possui peso de referência suficiente para o cálculo.");return}
  const resultadoCalc=(p.comprimentoReferencia/p.pesoReferencia)*pesoInformado;
  valor.textContent=fmt(resultadoCalc)+(p.unidade==="m"?" m":" unidades");
  detalhe.textContent=`Referência da planilha: ${fmt(p.pesoReferencia,p.pesoReferencia%1?3:2)} kg → ${fmt(p.comprimentoReferencia,p.comprimentoReferencia%1?2:0)} ${p.referenciaUnidade}`;
  resultado.classList.remove("hidden");
}
function montarTabela(){
  refBody.innerHTML="";
  produtos.forEach(p=>{
    const tr=document.createElement("tr");
    const status=p.status==="ok"?'<span class="badge ok">Disponível</span>':'<span class="badge incomplete">Incompleto</span>';
    const ref=p.pesoReferencia===null?"—":`${fmt(p.pesoReferencia, p.pesoReferencia%1?3:2)} kg`;
    tr.innerHTML=`<td>${p.categoria}</td><td>${p.produto}</td><td>${ref}</td><td>${fmt(p.comprimentoReferencia,p.comprimentoReferencia%1?2:0)} ${p.referenciaUnidade}</td><td>${status}</td>`;
    refBody.appendChild(tr);
  });
}
categoria.addEventListener("change",()=>{clearError();resultado.classList.add("hidden");carregarProdutos()});
calcular.addEventListener("click",calcularResultado);
limpar.addEventListener("click",()=>{categoria.value="";carregarProdutos();peso.value="";clearError();resultado.classList.add("hidden")});
peso.addEventListener("keydown",e=>{if(e.key==="Enter")calcularResultado()});
produto.addEventListener("change",clearError);

carregarCategorias();
carregarProdutos();
montarTabela();

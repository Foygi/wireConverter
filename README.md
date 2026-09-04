# Conversor de Fios — baseado na TABELA CONVERSAO.xlsx

A página `index.html` é AUTOSSUFICIENTE: CSS e JavaScript ficam embutidos no próprio arquivo.
Portanto, ela funciona mesmo com duplo clique no Windows, sem depender de servidor.

O projeto também traz:
- `fios.json`: dados transpostos da planilha.
- `style.css`: versão externa do visual.
- `script.js`: versão externa da lógica.

A página principal usa os dados embutidos para evitar problemas de carregamento por `file://`.

Fórmula:
(quantidade de referência ÷ peso de referência) × peso informado

Os dados incompletos da planilha são mostrados, porém bloqueados para cálculo.

# FEITO COM AUXILIO DE IA!!
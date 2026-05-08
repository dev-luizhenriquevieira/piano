# Virtual Piano

Virtual Piano e um simulador de piano desenvolvido com HTML, CSS e JavaScript puro. O projeto permite tocar notas musicais usando cliques nas teclas exibidas na tela ou pressionando as teclas correspondentes no teclado do computador.

## Visao Geral

O objetivo do projeto e oferecer uma experiencia simples, interativa e responsiva para praticar manipulacao de DOM, eventos de teclado, reproducao de audio no navegador e organizacao de arquivos em uma aplicacao web estatica.

## Funcionalidades

- Reproducao de notas musicais com arquivos de audio `.wav`.
- Interacao por clique nas teclas do piano.
- Interacao pelo teclado fisico do computador.
- Controle de volume em tempo real.
- Alternancia para mostrar ou ocultar as letras das teclas.
- Controle de delay para prolongar a cauda das notas com Web Audio API, sem usar loop.
- Efeito visual ao pressionar uma tecla.
- Estrutura simples, sem dependencias externas obrigatorias.

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Web Audio API
- Google Fonts
- Arquivos de audio no formato `.wav`

## Estrutura do Projeto

```text
.
|-- index.html
|-- README.md
|-- scripts
|   `-- engine.js
|-- styles
|   |-- main.css
|   `-- reset.css
`-- tunes
    |-- a.wav
    |-- d.wav
    |-- e.wav
    |-- f.wav
    |-- g.wav
    |-- h.wav
    |-- j.wav
    |-- k.wav
    |-- l.wav
    |-- o.wav
    |-- p.wav
    |-- s.wav
    |-- t.wav
    |-- u.wav
    |-- w.wav
    |-- y.wav
    `-- ;.wav
```

## Como Executar

Como o projeto e uma aplicacao estatica, basta abrir o arquivo `index.html` em um navegador moderno.

Tambem e possivel executar com um servidor local:

```bash
python -m http.server 5500
```

Depois, acesse:

```text
http://localhost:5500
```

## Como Usar

1. Abra o projeto no navegador.
2. Clique nas teclas do piano para tocar as notas.
3. Use as teclas exibidas na tela para tocar pelo teclado fisico.
4. Ajuste o volume pelo controle deslizante.
5. Use a opcao "Teclas" para exibir ou ocultar os nomes das teclas.
6. Ative "Delay" para prolongar a cauda das notas tocadas e permitir sobreposicao entre elas.

## Mapeamento das Teclas

As notas sao associadas aos arquivos de audio conforme o valor do atributo `data-tune` de cada tecla no HTML. O atributo `data-key` define qual tecla do computador aciona a nota, enquanto `data-tune` define qual arquivo `.wav` sera reproduzido.

O teclado visual segue o padrao de um piano real: nao ha tecla preta entre a 3a e a 4a teclas brancas, nem entre a 7a e a 8a teclas brancas.

Os arquivos `p.wav` e `;.wav` permanecem na pasta de sons, mas nao estao mapeados na interface atual. Como duas teclas pretas foram removidas para respeitar o formato real do piano, a sequencia sonora usa apenas os 15 primeiros arquivos.

Exemplo:

```js
audio.src = `./tunes/${clickedKey.dataset.tune}.wav`;
```

Se a tecla pressionada for `t`, por exemplo, o navegador reproduz o arquivo:

```text
./tunes/f.wav
```

## Principais Arquivos

- `index.html`: estrutura da interface, teclas do piano e controles.
- `styles/main.css`: estilos principais, layout do piano e efeitos visuais.
- `styles/reset.css`: normalizacao basica de estilos do navegador.
- `scripts/engine.js`: logica de interacao, eventos, volume, delay com Web Audio API e reproducao de audio.
- `tunes/`: arquivos de som usados pelas teclas do piano.

## Melhorias Futuras

- Adicionar responsividade aprimorada para telas menores.
- Criar suporte a diferentes bancos de sons.
- Adicionar gravacao e reproducao de sequencias tocadas.
- Exibir nomes musicais das notas alem das teclas do teclado.
- Implementar modo claro e modo escuro.

## Licenca

Este projeto pode ser usado para fins de estudo, pratica e demonstracao. Caso seja publicado, recomenda-se adicionar uma licenca formal ao repositorio.
